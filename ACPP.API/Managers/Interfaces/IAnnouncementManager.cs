using ACPP.API.Models;

namespace ACPP.API.Managers.Interfaces
{
    public interface IAnnouncementManager
    {
        Task<AnnouncementModel> GetAnnouncement(string env);
    }
}