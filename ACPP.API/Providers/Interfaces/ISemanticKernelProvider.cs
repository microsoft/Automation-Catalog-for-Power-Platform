using ACPP.API.Models;

namespace ACPP.API.Providers.Interfaces
{
    public interface ISemanticKernelProvider
    {
        Task<string[]> SearchCardsFromUserPrompt(string prompt, List<CardsModel> cards);
    }
}