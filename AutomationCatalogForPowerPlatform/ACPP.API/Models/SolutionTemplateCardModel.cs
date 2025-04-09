using Newtonsoft.Json;

namespace ACPP.API.Models
{
    public class SolutionTemplateCardModel
    {
        [JsonProperty("mspcat_tpsid")]
        public string SolutionTemplateUniqueId{ get; set; }

        [JsonProperty("mspcat_applicationsid")]
        public string SolutionApplicationsId { get; set; }

        [JsonProperty("mspcat_name")]
        public string CardTitle { get; set; }

        [JsonProperty("mspcat_description")]
        public string CardDescription { get; set; }

        private string _cardImageUrl = "https://imageassetssa.z5.web.core.windows.net/images/detailedViewPlaceholder.png";
        public string CardImageUrl
        {
            get => _cardImageUrl;
            set => _cardImageUrl = value;
        }

        public string CardVideoUrl { get; set; }

        private string _cardIconUrl = "https://imageassetssa.z5.web.core.windows.net/images/task.png";
        public string CardIconUrl { 
            get => _cardIconUrl;
            set => _cardIconUrl = value;
        }

        [JsonProperty("cr74e_isfeatured")]
        public  bool IsFeatured { get; set; }

        [JsonProperty("daw_ahcategories")]
        public string CardCategory { get; set; }

        private int _noOfClicks = 0;
        public int NoOfClicks
        {
            get => _noOfClicks;
            set => _noOfClicks = value;
        }

        private bool _isNew = false;
        public bool IsNew
        {
            get => _isNew;
            set => _isNew = value;
        }
    }

}
