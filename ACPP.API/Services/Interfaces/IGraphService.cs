using ACPP.API.Models;
using Microsoft.Graph.Models;

namespace ACPP.API.Services.Interfaces
{
    public interface IGraphService
    {
        Task<GraphUserModel?> GetUserInformation(string userId);
    }
}