namespace ACPP.API.Configuration
{
    public class GraphConfiguration
    {
        public const string SectionName = "GraphAPI";

        public string BaseUrl { get; set; }

        public string MeEndpoint { get; set; }

        public string UserScope { get; set; }
    }
}
