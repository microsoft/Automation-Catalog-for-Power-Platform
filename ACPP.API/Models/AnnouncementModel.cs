namespace ACPP.API.Models
{
    public class AnnouncementModel
    {
        public string AnnouncementMessage { get; set; }
        public string AnnouncementType { get; set; }
        public bool SetAnnouncement {  get; set; }
        public string AnnouncementLinkUrl { get; set; }
        public string AnnouncementLinkText { get; set; }
    }
}
