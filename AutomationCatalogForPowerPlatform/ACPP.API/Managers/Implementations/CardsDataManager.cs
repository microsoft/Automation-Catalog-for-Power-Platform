// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Cache;
using ACPP.API.Constants;
using ACPP.API.Extensions;
using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using ACPP.API.Providers.Interfaces;
using ACPP.API.Utilities;
using Azure;
using Azure.Data.Tables;
using Microsoft.ApplicationInsights;


namespace ACPP.API.Managers.Implementations
{
    public class CardsDataManager : ICardsDataManager
    {
        private readonly TableClient _cardsTableClient;
        private readonly IServiceClientMemoryCache _clientMemoryCache;
        private readonly ILogger<CardsDataManager> _logger;

        public CardsDataManager(ITableStorageProvider tableStorageProvider
            , IServiceClientMemoryCache serviceClientMemoryCache
            , ILogger<CardsDataManager> logger
            , TelemetryClient telemetry)
        {
            _cardsTableClient = tableStorageProvider.GetCardsTableClient();
            _clientMemoryCache = serviceClientMemoryCache;
            _logger = logger;
        }

        public async Task<List<CardsModel>> GetAllCards(string env = "prod")
        {
            try
            {
                string searchQuery = $"PartitionKey eq '{ApplicationConstants.CardsPartitionKey}' and CardStatus eq {(int)ApplicationConstants.CardStatus.Active}";
                if (env != "uat")
                {
                    searchQuery += " and CardEnvironment eq 'prod'";
                }

                List<CardsModel> cards = await _clientMemoryCache.GetCacheItemAsync<List<CardsModel>>($"AllCards-{env}");
                if (cards == null)
                {
                    AsyncPageable<TableEntity> result = _cardsTableClient.QueryAsync<TableEntity>(filter: searchQuery);
                    List<TableEntity> cardsData = await result.ToList();
                    cards = cardsData.ToCardsModel();
                    ServiceClientMemoryCacheItem cardsDataCacheItem = new ServiceClientMemoryCacheItem()
                    {
                        ItemKey = $"AllCards-{env}",
                        ItemType = MemoryCacheItemType.CardsData,
                        ObjectToCache = cards,
                        SuggestedCacheExpiry = TimeSpan.FromMinutes(30)
                    };
                    await _clientMemoryCache.WriteCacheItemAsync(cardsDataCacheItem);
                }
                return cards;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting all cards for env:{env}");
                return null;
            }
        }

        public async Task UpdateClickCount(string cardUniqueName)
        {
            try
            {
                NullableResponse<TableEntity> result = await _cardsTableClient.GetEntityIfExistsAsync<TableEntity>(ApplicationConstants.CardsPartitionKey, cardUniqueName);
                if (result != null)
                {
                    TableEntity cardEntity = result.Value;
                    if (cardEntity["NoOfClicks"] == null)
                    {
                        cardEntity["NoOfClicks"] = 1;
                    }
                    else
                    {
                        cardEntity["NoOfClicks"] = (int)cardEntity["NoOfClicks"] + 1;
                    }
                    await _cardsTableClient.UpdateEntityAsync(cardEntity, ETag.All, TableUpdateMode.Merge);
                }
                return;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating click count for card:{cardUniqueName}");
            }
        }
    }
}

