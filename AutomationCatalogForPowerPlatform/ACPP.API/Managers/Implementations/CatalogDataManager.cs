// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

        public async Task<string> makeHttpCall(string tokenScope, string token, string queryParameters, string catalogEnvUrl, string tableEndpoint, bool deserialized)
        {
            var listItemsUrl = $"{catalogEnvUrl}{tableEndpoint}{queryParameters}";
            HttpClient client = _httpClientFactory.CreateClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, listItemsUrl);
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                if (deserialized)
                {
                    var responseObject = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    responseBody = responseObject?.value?.ToString();
                }
                return responseBody;
            }
            return "No response";
        }
        public async Task<string> GetSystemUserId(string? envUrl, string userId)
        {
            try
            {
                string[] scopes = new[] { $"{envUrl ?? _configuration.CatalogEnvUrl}/{_configuration.TokenScope}" };
                string token = await GetTokenForCatalog(scopes);
                string filterQuery = "azureactivedirectoryobjectid eq " + userId + " &$select=systemuserid";
                string systemUserIdUrl = $"{envUrl ?? _configuration.CatalogEnvUrl}/{_configuration.SystemUsersEndpoint}/?$filter={filterQuery}";
                HttpClient client = _httpClientFactory.CreateClient();
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, systemUserIdUrl);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                HttpResponseMessage response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    JObject responseObject = JObject.Parse(responseBody);
                    string systemUserId = responseObject["value"]?.First?["systemuserid"]?.ToString();
                    return systemUserId;
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting system user id");
                return null;
            }
        }

        public async Task<List<InstalledSolutionTemplateCardModel>> GetUserItems(string? envUrl, string systemuserid)
        {
            try
            {
                string[] scopes = new[] { $"{envUrl ?? _configuration.CatalogEnvUrl}/{_configuration.TokenScope}" };
                string token = await GetTokenForCatalog(scopes);
                string queryParameters = $"/?$select=_mspcat_catalogitem_value,createdon,mspcat_templatesuffixid,mspcat_settings,mspcat_environmenturl&$expand=mspcat_CatalogItem&$filter=statuscode eq 526430003 and _mspcat_publisher_value eq {_configuration.PublisherId} and _owninguser_value eq {systemuserid}";
                var value = await makeHttpCall(_configuration.TokenScope, token, queryParameters, _configuration.CatalogEnvUrl, _configuration.InstallHistoriesEndPoint, true);
                if (string.IsNullOrEmpty(value))
                {
                    return null;
                }
                List<InstalledSolutionTemplateCardModel> installedItems = JsonConvert.DeserializeObject<List<InstalledSolutionTemplateCardModel>>(value);
                if (installedItems == null)
                {
                    return null;
                }

                var tasks = installedItems.Select(item => PopulateItemDetails(item)).ToArray();
                await Task.WhenAll(tasks);

                return installedItems;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting installed items");
                return null;
            }
        }

        private async Task PopulateItemDetails(InstalledSolutionTemplateCardModel item)
        {
            try
            {
                string[] scopes = new[] { $"{item.mspcat_EnvironmentUrl}{_configuration.TokenScope}" };
                string token = await GetTokenForCatalog(scopes);
                var environmentIdTask = FetchEnvironmentId(item.mspcat_EnvironmentUrl, token);
                var solutionPackageNameTask = Task.FromResult(ExtractSolutionTemplateSuffix(item.solutionPackageName, token));
                var solutionIdTask = FetchSolutionId(item.mspcat_EnvironmentUrl, await solutionPackageNameTask, item.mspcat_TemplateSuffixId, token);

                if (string.IsNullOrEmpty(await solutionIdTask))
                {
                    item.solutionId = "";
                    item.objectId = "";
                    item.flowRuns = 0;
                    item.flowUrl = "";
                    return;
                }

                var objectIdTask = FetchObjectId(item.mspcat_EnvironmentUrl, await solutionIdTask, token);

                item.environmentId = await environmentIdTask;
                item.solutionPackageName = await solutionPackageNameTask;
                item.solutionId = await solutionIdTask;
                item.objectId = await objectIdTask;

                await PopulateFlowDetails(item, token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error populating item details");
            }
        }

        private async Task<string> FetchEnvironmentId(string environmentUrl, string token)
        {
            try
            {
                string queryParameters = "(ClientMetadataQuery=@ClientMetadataQuery)?@ClientMetadataQuery={%22DependencyDepth%22:%22UserContext%22}";
                var value = await makeHttpCall(_configuration.TokenScope, token, queryParameters, environmentUrl, _configuration.GetClientMetadataEndPoint, false);
                JObject parsedJson = JObject.Parse(value);
                string metadata = parsedJson["Metadata"]?.ToString();
                if (metadata != null)
                {
                    JObject metadataJson = JObject.Parse(metadata);
                    return metadataJson["UserContext"]?[0]?["OrganizationSettings"]?["OrganizationBAPEnvironmentID"]?.ToString();
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching environment ID");
                return null;
            }
        }

        private string ExtractSolutionTemplateSuffix(string input, string token)
        {
            try
            {
                string[] parts = input.Split(new string[] { "||" }, StringSplitOptions.None);
                return parts[1].Split('=')[1].Split(':')[0];
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error extracting solution template suffix");
                return null;
            }
        }

        private async Task<string> FetchSolutionId(string environmentUrl, string solutionPackageName, string templateSuffixId, string token)
        {
            try
            {
                string queryParameters = $"/?$select=solutionid&$filter=templatesuffix ne null and uniquename eq '{solutionPackageName}_{templateSuffixId.ToLower()}'";
                var value = await makeHttpCall(_configuration.TokenScope, token, queryParameters, environmentUrl, _configuration.SolutionsEndpoint, true);
                JArray solutionIdJson = JArray.Parse(value);
                return solutionIdJson?[0]?["solutionid"]?.ToString();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching solution ID");
                return null;
            }
        }

        private async Task<string> FetchObjectId(string environmentUrl, string solutionId, string token)
        {
            try
            {
                string queryParameters = $"/?$select=objectid&$filter=componenttype eq 29 and _solutionid_value eq {solutionId}";
                var value = await makeHttpCall(_configuration.TokenScope, token, queryParameters, environmentUrl, _configuration.SolutionComponentEndPoint, true);
                if (!string.IsNullOrEmpty(value))
                {
                    JArray objectIdJson = JArray.Parse(value);
                    return objectIdJson?[0]?["objectid"]?.ToString();
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching object ID");
                return null;
            }
        }

        private async Task PopulateFlowDetails(InstalledSolutionTemplateCardModel item, string token)
        {
            try
            {
                item.flowRuns = 0;
                item.flowUrl = "";
                if (item.objectId != null)
                {
                    string queryParameters = $"/?$select=workflowid,flowrunid,status,endtime&$filter=status eq 'Succeeded' and workflowid eq {item.objectId}";
                    var value = await makeHttpCall(_configuration.TokenScope, token, queryParameters, item.mspcat_EnvironmentUrl, _configuration.FlowRunEndPoint, true);
                    if (!string.IsNullOrEmpty(value) && JArray.Parse(value).Count > 0)
                    {
                        JArray flowrunJson = JArray.Parse(value);
                        item.flowRuns = flowrunJson.Count;
                        item.noOfDaysWithAtleastOneSuccessfulRun = flowrunJson
                            .Select(x => DateTime.Parse(x["endtime"].ToString()).ToString("yyyy-MM-dd"))
                            .Distinct()
                            .Count();
                        var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
                        var successfulRuns = flowrunJson
                            .Where(x => DateTime.Parse(x["endtime"].ToString()) >= thirtyDaysAgo)
                            .Select(x => DateTime.Parse(x["endtime"].ToString()))
                            .GroupBy(date => (date - thirtyDaysAgo).Days / 7)
                            .Where(group => group.Any())
                            .Count();
                        item.noOfWeeksWithAtleastOneSuccessfulRun = successfulRuns;
                    }
                    item.flowUrl = $"https://make.powerautomate.com/environments/{item.environmentId}/flows/{item.objectId}/details";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error populating flow details");
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

