using System.Collections.Generic;
using Newtonsoft.Json;

namespace api.Json
{
    public class IcaCategory
    {
        [JsonProperty("categoryId")]
        public string CategoryId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("index")]
        public int Index { get; set; }

        [JsonProperty("productCount")]
        public int ProductCount { get; set; }

        [JsonProperty("seoUrl")]
        public string SeoUrl { get; set; }

        [JsonProperty("childCategories")]
        public List<IcaCategory> ChildCategories { get; set; }
    }
}
