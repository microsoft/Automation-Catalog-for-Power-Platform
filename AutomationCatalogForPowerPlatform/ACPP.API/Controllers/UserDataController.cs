// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using ACPP.API.Services;
using ACPP.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ACPP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDataController : ControllerBase
    {
        private readonly IUserManager _userManager;
        private readonly ILogger<UserDataController> _logger;

        public UserDataController(IUserManager userManager, ILogger<UserDataController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("GetUserDetails")]
        public async Task<UserDetails> GetUserDetails()
        {
            _logger.LogInformation("GetUserDetails called");
            string userId = TokenHelper.GetUserId(HttpContext.User.Identity);
            UserDetails userDetails = await _userManager.GetUserDetails(userId);
            if (userDetails == null)
            {
                userDetails = await _userManager.AddNewUser(userId);
            }
            return userDetails;
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("UpdateLastVisitTime")]
        public async Task<bool> UpdateLastVisitTime()
        {
            string userId = TokenHelper.GetUserId(HttpContext.User.Identity);
            if (userId == null)
            {
                _logger.LogError("UpdateLastVisitTime called without userId");
                return false;
            }
            return await _userManager.UpdateUserLastVisitTime(userId);
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("UpdateEmailsSubscription")]
        public async Task<bool> UpdateEmailsSubscription([FromQuery] bool newValue)
        {
            string userId = TokenHelper.GetUserId(HttpContext.User.Identity);
            if (userId == null)
            {
                _logger.LogError("UpdateEmailsSubscription called without userId");
                return false;
            }
            return await _userManager.UpdateUserEmailsSubscription(userId, newValue);
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("UpdateTeamsNotificationsSubscription")]
        public async Task<bool> UpdateTeamsNotificationsSubscription([FromQuery] bool newValue)
        {
            string userId = TokenHelper.GetUserId(HttpContext.User.Identity);
            if (userId == null)
            {
                _logger.LogError("UpdateTeamsNotificationsSubscription called without userId");
                return false;
            }
            return await _userManager.UpdateUserTeamsNotificationsSubscription(userId, newValue);
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("UpdatePersonalDevEnvId")]
        public async Task<bool> UpdatePersonalDevEnvId([FromQuery] string newValue)
        {
            string userId = TokenHelper.GetUserId(HttpContext.User.Identity);
            if (userId == null)
            {
                _logger.LogError("UpdatePersonalDevEnvId called without userId");
                return false;
            }
            return await _userManager.UpdateUserPersonalDevEnvId(userId, newValue);
        }
    }
}

