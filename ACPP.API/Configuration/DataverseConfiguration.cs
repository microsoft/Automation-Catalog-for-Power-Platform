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
    }
}
