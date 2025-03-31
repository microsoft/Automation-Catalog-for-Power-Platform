using ACPP.API.Models;

namespace ACPP.API.Managers.Interfaces
{
    public interface ICatalogDataManager
    {
        Task<List<SolutionTemplateCardModel>> GetAllItems(string envName);

        Task<string[]> SearchCards(SearchCardsRequestModel searchCardsRequestModel);
    }
}