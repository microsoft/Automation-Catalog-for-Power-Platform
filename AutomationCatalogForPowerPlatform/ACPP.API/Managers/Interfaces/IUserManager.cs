// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Models;

namespace ACPP.API.Managers.Interfaces
{
    public interface IUserManager
    {
        Task<UserDetails> AddNewUser(string userId);
        Task<UserDetails> GetUserDetails(string userId);
        Task<bool> UpdateUserLastVisitTime(string userId);
        Task<bool> UpdateUserEmailsSubscription(string userId, bool preference);
        Task<bool> UpdateUserTeamsNotificationsSubscription(string userId, bool preference);
        Task<bool> UpdateUserPersonalDevEnvId(string userId, string envId);
    }
}
