using ACPP.API.Configuration;
using ACPP.API.Models;
using ACPP.API.Providers.Interfaces;
using Azure.Identity;
using Microsoft.DeepDev;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.TextGeneration;
using Newtonsoft.Json;


namespace ACPP.API.Providers.Implementations
{
    public class SemanticKernelProvider : ISemanticKernelProvider
    {
        private readonly SemanticKernelConfiguration _configuration;
        private readonly ILogger<SemanticKernelProvider> _logger;
        private readonly Kernel _kernel;
        private readonly ITextGenerationService _textGenerationService;
        private readonly ITokenizer _tokenizer;
        private readonly string promptTemplate = "Cards information: {0}. Using the above information, return only the CardUniqueNames of all cards that are relavant to question asked after the example. Return only one answer and return an empty array [] if no card is rela Here is one example Q: Emails Management. A: [ 'flagImportantMails', 'EmailToDo', 'beNotifiedOfKeyEmails'] Q: {1} A:";

        public SemanticKernelProvider(IOptions<SemanticKernelConfiguration> Configuration, ILogger<SemanticKernelProvider> logger)
        {
            _configuration = Configuration.Value;
            _logger = logger;

            _kernel = Kernel.CreateBuilder().AddAzureOpenAITextGeneration(
                    deploymentName: _configuration.SemanticKernelTextCompletionService,
                    endpoint: _configuration.SemanticKernelEndpoint,
                    credentials: new DefaultAzureCredential()
                ).Build();

            _textGenerationService = _kernel.GetRequiredService<ITextGenerationService>();

            Dictionary<string, int> specialTokens = new Dictionary<string, int> { };
            _tokenizer = TokenizerBuilder.CreateByModelNameAsync("text-davinci-003", specialTokens).Result;

        }

        public async Task<string[]> SearchCardsFromUserPrompt(string prompt, List<CardsModel> cards)
        {
            List<string> chunks = CreateChunksFromCardData(cards);
            List<string> results = new List<string>();
            foreach (var chunk in chunks)
            {
                string finalPrompt = string.Format(promptTemplate, chunk, prompt);
                string[] result = await GetTextCompletion(finalPrompt);
                results.AddRange(result);
            }
            return results.ToArray();
        }

        private List<string> CreateChunksFromCardData(List<CardsModel> cards)
        {
            var chunks = new List<string>();
            string currentChunk = "";
            foreach (var card in cards)
            {
                string cardInfo = JsonConvert.SerializeObject(new
                {
                    card.CardCategory,
                    card.CardDescription,
                    //card.CardLongDescription,
                    card.CardKeywords,
                    card.CardTitle,
                    card.CardUniqueName,
                });
                var tokenCount = _tokenizer.Encode(currentChunk + cardInfo).Count;
                if (tokenCount < 3500)
                {
                    currentChunk = $"{currentChunk} {cardInfo}";
                }
                else
                {
                    chunks.Add(currentChunk);
                    currentChunk = cardInfo;
                }
            }
            chunks.Add(currentChunk);
            return chunks;
        }

        private async Task<string[]> GetTextCompletion(string prompt)
        {
            try
            {
                var result = await _textGenerationService.GetTextContentsAsync(prompt);
                if(result == null)
                {
                    //return emplty string array
                    return new string[] { };
                }
                string completedText = result.FirstOrDefault().Text;
                string[] completedTextArray = JsonConvert.DeserializeObject<string[]>(completedText);
                return completedTextArray;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting text completion for prompt:{prompt}");
                return new string[] { };
            }
        }





    }
}
