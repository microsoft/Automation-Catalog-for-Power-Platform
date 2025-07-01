// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Azure.Data.Tables;

namespace ACPP.API.Providers.Interfaces
{
    public interface ITableStorageProvider
    {
        TableClient GetCardsTableClient();
        TableClient GetUsersTableClient();
        TableClient GetAnnouncementsTableClient();
    }
}
