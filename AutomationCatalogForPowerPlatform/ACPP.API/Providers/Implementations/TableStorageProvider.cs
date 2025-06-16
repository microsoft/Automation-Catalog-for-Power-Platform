// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Cache;
using ACPP.API.Configuration;
using ACPP.API.Providers.Interfaces;
using Azure.Data.Tables;
using Azure.Identity;
using Microsoft.Extensions.Options;

namespace ACPP.API.Providers.Implementations
{
    public class TableStorageProvider : ITableStorageProvider
    {
        private readonly ILogger<TableStorageProvider> _logger;
        private readonly AzureStorageConfiguration _configuration;
        private readonly TableServiceClient _tableServiceClient;
        private readonly TableClient _usersTableClient;
        private readonly TableClient _cardsTableClient;
        private readonly TableClient _announcementsTableClient;

        public TableStorageProvider(IOptions<AzureStorageConfiguration> configuration, ILogger<TableStorageProvider> logger)
        {
            _configuration = configuration.Value;
            _logger = logger;
            _tableServiceClient = new TableServiceClient(new Uri(_configuration.StorageAccountUri), new DefaultAzureCredential());
            _usersTableClient = _tableServiceClient.GetTableClient(_configuration.UsersTableName);
            _cardsTableClient = _tableServiceClient.GetTableClient(_configuration.CardsTableName);
            _announcementsTableClient = _tableServiceClient.GetTableClient(_configuration.AnnouncementsTableName);
        }

        public TableClient GetUsersTableClient()
        {
            return _usersTableClient;
        }

        public TableClient GetCardsTableClient()
        {
            return _cardsTableClient;
        }

        public TableClient GetAnnouncementsTableClient()
        {
            return _announcementsTableClient;
        }
    }
}

