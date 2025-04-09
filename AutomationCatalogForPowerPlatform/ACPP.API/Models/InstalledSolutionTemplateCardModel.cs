using Newtonsoft.Json;

namespace ACPP.API.Models
{
    public class InstalledSolutionTemplateCardModel
    {
        [JsonProperty("mspcat_CatalogItem")]
        public mspcat_CatalogItem mspcat_CatalogItem { get; set; }
              
        [JsonProperty("_mspcat_catalogitem_value")]
        public string SolutionTemplateUniqueId{ get; set; }

        [JsonProperty("createdon")]
        public string InstalledOn { get; set; }

        [JsonProperty("mspcat_templatesuffixid")]
        public string mspcat_TemplateSuffixId { get; set; }

        [JsonProperty("mspcat_settings")]
        public string solutionPackageName { get; set; }

        public string mspcat_EnvironmentUrl { get; set; }

        public string solutionId { get; set; }

        public string objectId { get; set; }

        public string environmentId { get; set; }

        public int flowRuns { get; set; }

        public int noOfDaysWithAtleastOneSuccessfulRun { get; set; }

        public string flowUrl { get; set; }
        
        public int noOfWeeksWithAtleastOneSuccessfulRun { get; set; }
    }

    public class mspcat_CatalogItem
    {
        [JsonProperty("mspcat_tpsid")]
        public string SolutionTemplateUniqueId { get; set; }

        [JsonProperty("mspcat_applicationsid")]
        public string SolutionTemplateVersionId { get; set; }

        [JsonProperty("mspcat_name")]
        public string SolutionName { get; set; }

        [JsonProperty("cr74e_timesavingvalue")]
        public string TimeSavingValue { get; set; }

        [JsonProperty("cr74e_timesavingtype")]
        public string TimeSavingType { get; set; }

        [JsonProperty("cr74e_timesavingunit")]
        public string TimeSavingUnit { get; set; }
    }
}
