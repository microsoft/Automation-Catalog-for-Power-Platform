using ACPP.API.Cache;
using ACPP.API.Configuration;
using ACPP.API.Providers.Interfaces;
using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Certificates;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using System.Security.Cryptography.X509Certificates;
using System;

namespace ACPP.API.Providers.Implementations
{
    public class TokenProvider : ITokenProvider
    {

        private readonly AzureADConfiguration _configuration;
        private readonly ILogger<TokenProvider> _logger;
        private readonly IConfidentialClientApplication _confidentialClientApplication;

        public TokenProvider(IOptions<AzureADConfiguration> configuration, ILogger<TokenProvider> logger)
        {
            _configuration = configuration.Value;
            _logger = logger;

#if DEBUG
            var client = new CertificateClient(new Uri(_configuration.KeyVaultUri), new DefaultAzureCredential());
            X509Certificate2 certificate = client.DownloadCertificate(_configuration.AuthCertName);

            _confidentialClientApplication = ConfidentialClientApplicationBuilder
                .Create(_configuration.ClientId) //This is the client id for your SPN
                .WithCertificate(certificate, true)
                .WithAuthority($"https://login.microsoftonline.com/{_configuration.TenantId}")
                .Build();
#else
            Func<string> msiTokenGetter = () => new ManagedIdentityClientAssertion(_configuration.ManagedIdentityId)
            .GetSignedAssertionAsync(new AssertionRequestOptions() { CancellationToken = CancellationToken.None, ClientID = _configuration.ClientId })
            .GetAwaiter().GetResult();

            _confidentialClientApplication = ConfidentialClientApplicationBuilder
                .Create(_configuration.ClientId) //This is the client id for your SPN
                .WithClientAssertion(msiTokenGetter)
                .WithAuthority($"https://login.microsoftonline.com/{_configuration.TenantId}")
                .Build();
#endif
        }

        public async Task<string> GetOBOTokenForUser(string userToken, string[] scopes)
        {
            try
            {
                var result = await _confidentialClientApplication
                                    .AddInMemoryTokenCache() //this can cause problems later with memory, consider using a distributed cache
                                    .AcquireTokenOnBehalfOf(scopes, new UserAssertion(userToken))
                                    .ExecuteAsync();
                return result.AccessToken;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while exchanging user token");
            }
            return null;
        }
    }
}