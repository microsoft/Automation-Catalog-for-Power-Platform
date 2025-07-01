// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace ACPP.API.Configuration
{
    public class AzureSearchConfiguration
    {
        public const string SectionName = "AzureAISearch";

        public string SearchEndPoint { get; set; }

        public string IndexName { get; set; }
    }
}

