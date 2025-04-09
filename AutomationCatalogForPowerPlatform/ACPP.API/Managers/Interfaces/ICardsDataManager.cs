using ACPP.API.Models;

namespace ACPP.API.Managers.Interfaces
{
    public interface ICardsDataManager
    {
        Task<List<CardsModel>> GetAllCards(string env);
        Task UpdateClickCount(string cardUniqueName);
    }
}