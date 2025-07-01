// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace ACPP.API.Models
{
    public class SearchCardsRequestModel
    {
        public string[] SelectedCategories { get; set; }

        public string SearchText { get; set; }
    }
}
