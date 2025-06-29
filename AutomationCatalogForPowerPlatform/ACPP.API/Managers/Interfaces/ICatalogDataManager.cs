// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Models;

namespace ACPP.API.Managers.Interfaces
{
    public interface ICatalogDataManager
    {
        Task<List<SolutionTemplateCardModel>> GetAllItems(string envName);

        Task<string[]> SearchCards(SearchCardsRequestModel searchCardsRequestModel);

        Task<string> GetSystemUserId(string envName, string userId);

        Task<List<InstalledSolutionTemplateCardModel>> GetUserItems(string? envUrl, string systemuserid);
    }
}
