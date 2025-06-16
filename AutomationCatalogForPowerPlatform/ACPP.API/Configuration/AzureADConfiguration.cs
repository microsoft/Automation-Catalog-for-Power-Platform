// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace ACPP.API.Configuration
{
    public class AzureADConfiguration
    {
        public const string SectionName = "AzureAD";

        public string ClientId { get; set; }

        public string TenantId { get; set; }

        public string ManagedIdentityId{ get; set; }

        public string FICScope { get; set; }

        //required only for local debugging
        public string KeyVaultUri { get; set; }

        //required only for local debugging
        public string AuthCertName { get; set; }

    }
}

