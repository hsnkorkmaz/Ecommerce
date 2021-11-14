using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api.Json
{
    public class IcaProduct
    {
        [JsonProperty("name")]
        public string Name;

        [JsonProperty("sku")]
        public string Sku;

        [JsonProperty("descriptionLong")]
        public string DescriptionLong;

        [JsonProperty("cloudinaryImageId")]
        public string CloudinaryImageId;

        [JsonProperty("price")]
        public double Price;

        [JsonProperty("inCategories")]
        public List<InCategory> InCategories;
    }

    public class Path
    {
        [JsonProperty("slug")]
        public string Slug;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("id")]
        public string Id;

        [JsonProperty("level")]
        public int Level;
    }

    public class InCategory
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("slug")]
        public string Slug;

        [JsonProperty("path")]
        public List<Path> Path;

        [JsonProperty("level")]
        public int Level;
    }


}
