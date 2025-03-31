using ACPP.API.Configuration;
using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using ACPP.API.Providers.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ACPP.API.Managers.Implementations
{
    public class CatalogDataManager : ICatalogDataManager
    {
        private readonly ILogger<CatalogDataManager> _logger;
        private readonly DataverseConfiguration _configuration;
        private readonly ITokenProvider _tokenProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHttpClientFactory _httpClientFactory;

        public CatalogDataManager(IOptions<DataverseConfiguration> options, IHttpContextAccessor httpContextAccessor, ITokenProvider tokenProvider, IHttpClientFactory httpClientFactory, ILogger<CatalogDataManager> logger)
        {
            _tokenProvider = tokenProvider;
            _configuration = options.Value;
            _httpContextAccessor = httpContextAccessor;
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        public async Task<List<SolutionTemplateCardModel>> GetAllItems(string? envUrl)
        {
            try
            {
                string[] scopes = new[] { $"{envUrl ?? _configuration.CatalogEnvUrl}/{_configuration.TokenScope}" };
                string token = await GetTokenForCatalog(scopes);
                string filterQuery = "statecode eq 0 and statuscode eq 526430000";
                string listItemsUrl = $"{envUrl ?? _configuration.CatalogEnvUrl}/{_configuration.ListItemsEndpoint}/?$filter={filterQuery}";
                HttpClient client = _httpClientFactory.CreateClient();
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, listItemsUrl);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                HttpResponseMessage response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var responseObject = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    var values = responseObject.value.ToString();
                    List<SolutionTemplateCardModel> cards = JsonConvert.DeserializeObject<List<SolutionTemplateCardModel>>(values);
                    List<CatalogItemFileModel> catalogItemFiles = await GetAllCatalogItemFiles(client, scopes, token, envUrl);
                    return MatchIconUrls(cards, catalogItemFiles);
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting catalog items");
                return null;
            }

        }

        private async Task<List<CatalogItemFileModel>> GetAllCatalogItemFiles(HttpClient client, string[] scopes, string token, string? envUrl)
        {
            try
            {
                string selectQuery = "_mspcat_catalogitem_value,mspcat_image,mspcat_imagesize";
                string listItemsUrl = $"{envUrl ?? _configuration.CatalogEnvUrl}/{_configuration.ListCatalogItemFilesEndpoint}/?$select={selectQuery}";
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, listItemsUrl);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                HttpResponseMessage response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var responseObject = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    var values = responseObject.value.ToString();
                    List<CatalogItemFileModel> catalogItemFiles = JsonConvert.DeserializeObject<List<CatalogItemFileModel>>(values);
                    return catalogItemFiles;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting catalog items");
                return null;
            }
        }
        
        private List<SolutionTemplateCardModel> MatchIconUrls(List<SolutionTemplateCardModel> cards, List<CatalogItemFileModel> files)
        {
            List<SolutionTemplateCardModel> finalCards = new List<SolutionTemplateCardModel>();

            foreach (var card in cards)
            {
                var matchingFiles = files.Where(file => file.CatalogItemFileId == card.SolutionApplicationsId);

                if(matchingFiles != null) 
                {
                    foreach (var matchingFile in matchingFiles) {
                        if (matchingFile.CatalogItemFileSize == "526430000" || matchingFile.CatalogItemFileSize == "526430001")
                        {
                            card.CardIconUrl = "data:image/jpeg;base64, " + matchingFile.CatalogItemFileData;
                        }

                        if (matchingFile.CatalogItemFileSize == "526430002")
                        {
                            card.CardImageUrl = "data:image/jpeg;base64, " + matchingFile.CatalogItemFileData;
                        }
                    }
                }

                finalCards.Add(card);
            }

            return finalCards;

        }
                
        public async Task<string[]> SearchCards(SearchCardsRequestModel searchCardsRequestModel)
        {

            try
            {
                string[] scopes = new[] { $"{_configuration.CatalogEnvUrl}/{_configuration.TokenScope}" };
                string token = await GetTokenForCatalog(scopes);
                string searchUrl = $"{_configuration.CatalogEnvUrl}/{_configuration.SearchEndpoint}";
                string requestBody = GetDataverseSearchRequest(searchCardsRequestModel.SearchText);
                HttpClient client = _httpClientFactory.CreateClient();
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, searchUrl);
                request.Content = new StringContent(requestBody, System.Text.Encoding.UTF8, "application/json");
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                HttpResponseMessage response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    JObject responseObject = JObject.Parse(responseBody);
                    var responseValue = responseObject["response"].ToString();
                    DataverseSearchResponseModel searchReponse = JsonConvert.DeserializeObject<DataverseSearchResponseModel>(responseValue);
                    string[] results = searchReponse.Value.Select(x => x.Id).ToArray();
                    return results;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting search results");
                return null;
            }
        }


        private async Task<string> GetTokenForCatalog(string[] scopes)
        {
            string userToken = _httpContextAccessor.HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            string token = await _tokenProvider.GetOBOTokenForUser(userToken, scopes);
            return token;
        }

        private string GetDataverseSearchRequest(string searchText)
        {
            var searchRequest = new
            {
                search = searchText,
                entities = JsonConvert.SerializeObject(new[]
                {
                    new
                    {
                        Name = "mspcat_applications",
                        SearchColumns =  new[] { "mspcat_name", "mspcat_description" },
                        SelectColumns =  new[] { "mspcat_name", "mspcat_applicationid" },
                    }
                }),
                options = JsonConvert.SerializeObject(new
                {
                    querytype = "Simple",
                    searchmode = "Any",
                    besteffortsearchenabled = true,
                })

            };

            return JsonConvert.SerializeObject(searchRequest);
        }
    }
}
