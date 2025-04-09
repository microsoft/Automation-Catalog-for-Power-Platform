using ACPP.API.Managers.Implementations;
using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ACPP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementDataController: ControllerBase
    {
        private readonly IAnnouncementManager _announcementManager;
        private readonly ILogger<AnnouncementDataController> _logger;

        public AnnouncementDataController(IAnnouncementManager announcementManager, ILogger<AnnouncementDataController> logger)
        {
            _announcementManager = announcementManager;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("GetAnnouncement")]
        public async Task<AnnouncementModel> GetAnnouncement([FromQuery] string env = "prod")
        {
            AnnouncementModel announcement = await _announcementManager.GetAnnouncement(env);
            return announcement;
        }
    }
}
