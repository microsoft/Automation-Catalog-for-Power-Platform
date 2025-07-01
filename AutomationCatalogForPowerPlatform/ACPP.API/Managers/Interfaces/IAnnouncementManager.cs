// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Models;

namespace ACPP.API.Managers.Interfaces
{
    public interface IAnnouncementManager
    {
        Task<AnnouncementModel> GetAnnouncement(string env);
    }
}
