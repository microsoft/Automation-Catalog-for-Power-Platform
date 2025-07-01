// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Configuration;
using ACPP.API.Models;
using ACPP.API.Providers.Implementations;
using ACPP.API.Providers.Interfaces;
using ACPP.API.Services.Interfaces;
using Azure.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Microsoft.Graph.Users.Item.CheckMemberGroups;
using Microsoft.MarkedNet;
using Newtonsoft.Json;
using System.Net.Http;

namespace ACPP.API.Services.Implementations
{
    public class GraphService : IGraphService
    {
        private readonly ILogger<GraphService> _logger;
        private readonly GraphConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ITokenProvider _tokenProvider;

        public GraphService(IOptions<GraphConfiguration> options            
            , IHttpContextAccessor httpContextAccessor
            , ITokenProvider tokenProvider
            , IHttpClientFactory httpClientFactory
            , ILogger<GraphService> logger)
        {
            _logger = logger;
            _configuration = options.Value;
            _httpContextAccessor = httpContextAccessor;
            _httpClientFactory = httpClientFactory;
            _tokenProvider = tokenProvider;
        }

        public async Task<GraphUserModel?> GetUserInformation(string userId)
        {
            try
            {
                HttpClient client = _httpClientFactory.CreateClient();
                string[] scopes = new[] { _configuration.UserScope };
                string token = await GetTokenForGraph(scopes);
                string graphMeUrl = _configuration.BaseUrl + _configuration.MeEndpoint;
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, graphMeUrl);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                HttpResponseMessage response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    GraphUserModel user = JsonConvert.DeserializeObject<GraphUserModel>(responseBody);
                    return user;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user information");
                return null;
            }
        }

        private async Task<string> GetTokenForGraph(string[] scopes)
        {
            string userToken = _httpContextAccessor.HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            string token = await _tokenProvider.GetOBOTokenForUser(userToken, scopes);
            return token;
        }
    }
}

