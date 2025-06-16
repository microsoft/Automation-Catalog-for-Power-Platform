// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace ACPP.API.Models
{
    public class UserDetails : UserPreferences
    {
        public string DisplayName { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public DateTime? LastVistTime { get; set; }
        public bool IsFirstVisit { get; set; }
        public string PersonalDevEnvId { get; set; }

    }
}

