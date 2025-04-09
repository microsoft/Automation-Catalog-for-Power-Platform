using ACPP.API.Configuration;
using ACPP.API.Constants;
using ACPP.API.Extensions;
using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using ACPP.API.Providers.Interfaces;
using ACPP.API.Services.Interfaces;
using Azure;
using Azure.Data.Tables;
using Microsoft.Extensions.Options;
using Microsoft.Graph.Models;

namespace ACPP.API.Managers.Implementations
{

    public class UserManager : IUserManager
    {
        private readonly TableClient _usersTableClient;
        private readonly IGraphService _graphService;
        private readonly ILogger<UserManager> _logger;

        public UserManager(ITableStorageProvider tableStorageProvider
            , IGraphService graphService
            , ILogger<UserManager> logger)
        {
            _usersTableClient = tableStorageProvider.GetUsersTableClient();
            _graphService = graphService;
            _logger = logger;
        }

        public async Task<UserDetails> GetUserDetails(string userId)
        {
            try
            {
                TableEntity userEntity = await GetUserEntity(userId);
                if (userEntity != null)
                {
                    return userEntity.ToUserDetails();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting user details for userId:{userId}");
                return null;
            }
        }

        public async Task<UserDetails> AddNewUser(string userId)
        {
            try
            {
                TableEntity userEntity = await GetUserEntity(userId);
                if (userEntity == null)
                {
                    GraphUserModel? user = await _graphService.GetUserInformation(userId);
                    if (user == null)
                    {
                        _logger.LogError($"Error getting user information for userId:{userId}");
                        return null;
                    }
                    UserDetails userDetails = new UserDetails
                    {
                        UserId = userId,
                        DisplayName = user.DisplayName,
                        UserEmail = user.Mail,
                        TeamsNotificationsSubscribed = true,
                        EmailsSubscribed = true,
                        IsFirstVisit = true,
                    };
                    return await AddUserDetails(userDetails);
                }
                else
                {
                    return userEntity.ToUserDetails();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error adding new user for userId:{userId}");
            }
            return null;
        }

        public async Task<bool> UpdateUserLastVisitTime(string userId)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "LastVistTime", DateTime.UtcNow }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user last visit for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> UpdateUserTeamsNotificationsSubscription(string userId, bool preference)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "TeamsNotificationsSubscribed", preference }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user notification subscription for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> UpdateUserEmailsSubscription(string userId, bool preference)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "EmailsSubscribed", preference }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user emails subscription for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> UpdateUserPersonalDevEnvId(string userId, string envId)
        {
            TableEntity userEntity = await GetUserEntity(userId);
            if (userEntity != null)
            {
                TableEntity updatedEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userId)
                {
                    { "PersonalDevEnvId", envId }
                };
                try
                {
                    Response response = await _usersTableClient.UpdateEntityAsync(updatedEntity, userEntity.ETag);
                    return !response.IsError;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error updating user personal dev environment id for userId:{userId}");
                    return false;
                }
            }
            return false;
        }

        private async Task<TableEntity> GetUserEntity(string userId)
        {
            try
            {
                NullableResponse<TableEntity> userEntity = await _usersTableClient.GetEntityIfExistsAsync<TableEntity>(ApplicationConstants.UsersPartitionKey, userId);
                if (userEntity.HasValue)
                {
                    return userEntity.Value;
                }
                else
                {
                    _logger.LogInformation($"User with userId:{userId} not found");
                    return null;
                }
            }
            catch(Exception ex)
            {
                _logger.LogInformation($"User with userId:{userId} not found");
                return null;
            }
        }

        private async Task<UserDetails> AddUserDetails(UserDetails userDetails)
        {
            try
            {
                TableEntity userEntity = new TableEntity(ApplicationConstants.UsersPartitionKey, userDetails.UserId)
                {
                    { "DisplayName", userDetails.DisplayName },
                    { "TeamsNotificationsSubscribed" , userDetails.TeamsNotificationsSubscribed },
                    { "EmailsSubscribed", userDetails.EmailsSubscribed },
                    { "IsFirstVisit", userDetails.IsFirstVisit },
                    { "LastVistTime", DateTime.UtcNow },
                    { "UserId", userDetails.UserId },
                    { "UserEmail", userDetails.UserEmail }
                };
                await _usersTableClient.AddEntityAsync(userEntity);
                _logger.LogInformation($"Added user details for userId:{userDetails.UserId}");
                return userDetails;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error adding user details for userId:{userDetails.UserId}");
                return null;
            }
        }

    }
}
