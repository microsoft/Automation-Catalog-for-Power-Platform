// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using ACPP.API.Constants;
using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using ACPP.API.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph.Models.ExternalConnectors;
using Newtonsoft.Json;

namespace ACPP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardDataController : ControllerBase
    {
        private readonly ICardsDataManager _cardsDataManager;
        private readonly ILogger<CardDataController> _logger;

        public CardDataController(ICardsDataManager cardsDataManager, ILogger<CardDataController> logger)
        {
            _cardsDataManager = cardsDataManager;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("GetAllCards")]
        public async Task<List<CardsModel>> GetCardData([FromQuery] string env = "prod")
        {
            List<CardsModel> cardsModels = await _cardsDataManager.GetAllCards(env);
            return cardsModels;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("UpdateClickCount")]
        public async Task UpdateClickCount([FromQuery] string cardUniqueName)
        {
            _cardsDataManager.UpdateClickCount(cardUniqueName);
            return;
        }
    }
}

