namespace ACPP.API.Models
{
    public class SearchCardsRequestModel
    {
        public string[] SelectedCategories { get; set; }

        public string SearchText { get; set; }
    }
}