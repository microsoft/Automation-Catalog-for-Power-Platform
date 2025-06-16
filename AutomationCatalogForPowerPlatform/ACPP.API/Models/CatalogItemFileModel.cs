// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Newtonsoft.Json;

namespace ACPP.API.Models
{
    public class CatalogItemFileModel
    {
        [JsonProperty("mspcat_image")]
        public string CatalogItemFileData;

        [JsonProperty("_mspcat_catalogitem_value")]
        public string CatalogItemFileId;

        [JsonProperty("mspcat_imagesize")]
        public string CatalogItemFileSize;
    }
}

