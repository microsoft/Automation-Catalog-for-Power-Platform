using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ACPP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
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
    }
}
