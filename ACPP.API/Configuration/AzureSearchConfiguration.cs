namespace ACPP.API.Configuration
{
    public class AzureSearchConfiguration
    {
        public const string SectionName = "AzureAISearch";

        public string SearchEndPoint { get; set; }

        public string IndexName { get; set; }
    }
}
