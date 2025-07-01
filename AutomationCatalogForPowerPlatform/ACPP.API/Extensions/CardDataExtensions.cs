// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Models;
using Azure.Data.Tables;

namespace ACPP.API.Extensions
{
    public static class CardDataExtensions
    {
        public static List<CardsModel> ToCardsModel(this List<TableEntity> tableEntities)
        {
            List<CardsModel> cardsDTO = tableEntities.Select(cards => new CardsModel()
            {
                CardUniqueName = cards.GetString("CardUniqueName"),
                CardTitle = cards.GetString("CardTitle"),
                CardDescription = cards.GetString("CardDescription"),
                CardSubheader = cards.GetString("CardSubheader"),
                CardLongDescription = cards.GetString("CardLongDescription"),
                CardCategory = cards.GetString("CardCategory"),
                AutomationUrl = cards.GetString("AutomationUrl"),
                CardType = cards.GetString("CardType"),
                TemplateId = cards.GetString("TemplateId"),
                CardDisplayOrder = cards.GetInt32("CardDisplayOrder") ?? 0,
                NoOfClicks = cards.GetInt32("NoOfClicks") ?? 0,
                CardKeywords = cards.GetString("CardKeywords"),
                PowerAutomateEnvironment = cards.GetString("PowerAutomateEnvironment"),
                IsFeatured = cards.GetBoolean("IsBanner") ?? false,
                CardFrequency = cards.GetString("SavingsType"),
                CardTimeSavings = double.Parse(cards.GetString("TimeSaved")),
                CardTimeSavingsUnit = "mins",
                IsNew = cards.GetBoolean("IsNew") ?? false,
                CardImageUrl = cards.GetString("CardImageUrl") ?? "https://imageassetssa.z5.web.core.windows.net/images/detailedViewPlaceholder.png",
                CardVideoUrl = cards.GetString("CardVideoUrl"),
                CardIconUrl = cards.GetString("CardIconUrl") ?? "https://imageassetssa.z5.web.core.windows.net/images/task.png",
                TeamsCardDeeplink = cards.GetString("TeamsCardDeeplink")
            }).OrderBy(x => x.CardDisplayOrder).ToList();
            return cardsDTO;
        }
    }
}

