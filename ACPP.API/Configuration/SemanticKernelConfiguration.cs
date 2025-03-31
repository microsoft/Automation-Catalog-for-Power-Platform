namespace ACPP.API.Configuration
{
    public class SemanticKernelConfiguration
    {
        public const string SectionName = "SemanticKernel";

        public string SemanticKernelKey { get; set; }

        public string SemanticKernelEndpoint { get; set; }

        public string SemanticKernelTextCompletionService { get; set; }

        public string SemanticKernelEmbeddingGenerationService { get; set; }
    }
}
