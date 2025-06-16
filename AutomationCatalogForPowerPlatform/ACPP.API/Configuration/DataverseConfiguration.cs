// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace ACPP.API.Configuration
{
    public class DataverseConfiguration
    {
        public const string SectionName = "Dataverse";

        public string ListItemsEndpoint { get; set; }

        public string ListCatalogItemFilesEndpoint { get; set; }

        public string TokenScope { get; set; }

        public string CatalogEnvUrl { get; set; }

        public string SearchEndpoint { get; set; }

        public string SystemUsersEndpoint { get; set; }

        public string InstallHistoriesEndPoint { get; set; }

        public string SolutionsEndpoint { get; set; }

        public string SolutionComponentEndPoint { get; set; }

        public string FlowRunEndPoint { get; set; }

        public string GetClientMetadataEndPoint { get; set; }


        public string PublisherId { get; set; }
    }
}

