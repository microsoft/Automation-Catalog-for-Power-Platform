using ACPP.API.Constants;
using ACPP.API.Extensions;
using ACPP.API.Managers.Interfaces;
using ACPP.API.Models;
using ACPP.API.Providers.Interfaces;
using Azure;
using Azure.Data.Tables;

namespace ACPP.API.Managers.Implementations
{
    public class AnnouncementManager : IAnnouncementManager
    {

        private readonly TableClient _announcementTableClient;
        private readonly ILogger<AnnouncementManager> _logger;

        public AnnouncementManager(ITableStorageProvider tableStorageProvider, ILogger<AnnouncementManager> logger)
        {
            _announcementTableClient = tableStorageProvider.GetAnnouncementsTableClient();
            _logger = logger;
        }

        public async Task<AnnouncementModel> GetAnnouncement(string env)
        {
            try
            {
                string searchQuery = $"PartitionKey eq '{ApplicationConstants.AnnouncementPartitionKey}'";
                
                AsyncPageable<TableEntity> result = _announcementTableClient.QueryAsync<TableEntity>(filter: searchQuery);
                List<TableEntity> announcementData = await result.ToList();
                List<AnnouncementModel> announcements = announcementData.toAnnouncementsModel();
                return announcements.Any() ? announcements[0] : null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting all cards for env:{env}");
                return null;
            }
        }
    }
}
