// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Models;
using Azure.Data.Tables;

namespace ACPP.API.Extensions
{
    public static class AnnouncementDataExtensions
    {
        public static List<AnnouncementModel> toAnnouncementsModel(this List<TableEntity> tableEntities)
        {

            if (tableEntities == null)
            {
                return new List<AnnouncementModel>();
            }

            return tableEntities.Select(announcements => new AnnouncementModel()
            {
                AnnouncementMessage = announcements.GetString("AnnouncementMessage"),
                AnnouncementType = announcements.GetString("AnnouncementType"),
                SetAnnouncement = announcements.GetBoolean("SetActive") ?? false,
                AnnouncementLinkUrl = announcements.GetString("AnnouncementLinkUrl"),
                AnnouncementLinkText = announcements.GetString("AnnouncementLinkText")
            }).ToList();
        }
    }
}

