namespace ACPP.API.Configuration
{
    public class AzureStorageConfiguration
    {
        public const string SectionName = "AzureStorage";

        public string StorageAccountUri { get; set; }

        public string UsersTableName { get; set; }

        public string CardsTableName { get; set; }

        public string AnnouncementsTableName { get; set; }

    }
}
