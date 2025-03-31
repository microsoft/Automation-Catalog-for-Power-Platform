using System.ComponentModel.DataAnnotations;

namespace ACPP.API.Models
{
    public class CardsModel
    {
        public string CardUniqueName { get; set; }

        public string CardTitle { get; set; }

        public string CardDescription { get; set; }

        public string CardLongDescription { get; set; }

        public string CardSubheader { get; set; }

        public string CardCategory { get; set; }

        public string AutomationUrl { get; set; }

        public string CardType { get; set; }

        public string TemplateId { get; set; }

        public int CardDisplayOrder { get; set; }

        public int NoOfClicks { get; set; }

        public string CardKeywords { get; set; }

        public string PowerAutomateEnvironment { get; set; }

        public bool IsFeatured { get; set; }

        public double CardTimeSavings { get; set; }

        public string CardFrequency { get; set; }

        public string CardTimeSavingsUnit { get; set; }

        public bool IsNew { get; set; }

        public string CardImageUrl { get; set; }

        public string CardVideoUrl { get; set; }

        public string CardIconUrl { get; set; }

        public string TeamsCardDeeplink { get; set; }
    }

}
