using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using ACPP.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ACPP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogItemsController : ControllerBase
    {
        private readonly ILogger<CatalogItemsController> _logger;
        private readonly ICatalogDataManager _catalogDataManager;

        public CatalogItemsController(ICatalogDataManager catalogDataManager, ILogger<CatalogItemsController> logger)
        {
            _logger = logger;
            _catalogDataManager = catalogDataManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("GetSolutionTemplates")]
        public async Task<List<SolutionTemplateCardModel>> GetTemplatesFromCatalog(string? envUrl)
        {
            List<SolutionTemplateCardModel> result = await _catalogDataManager.GetAllItems(envUrl);
            if(result == null)
            {
                throw new Exception("Error getting catalog items");
            }
            return result;
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("SearchCards")]
        public async Task<string[]> SearchCards([FromBody] SearchCardsRequestModel searchCardsRequestModel)
        {
            string[] result = await _catalogDataManager.SearchCards(searchCardsRequestModel);
            return result;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("GetUserCatalogItems")]
        public async Task<List<InstalledSolutionTemplateCardModel>> GetUserCatalogItems(string? envUrl)
        {
            string userId = TokenHelper.GetUserId(HttpContext.User.Identity);
            if (userId == null)
            {
                throw new Exception("Error getting user ID");
            }
            string systemUserId = await _catalogDataManager.GetSystemUserId(envUrl, userId);
            List<InstalledSolutionTemplateCardModel> result = await _catalogDataManager.GetUserItems(envUrl, systemUserId);
            if (result == null)
            {
                throw new Exception("Error getting installed items");
            }
            return result;
        }
    }
}
