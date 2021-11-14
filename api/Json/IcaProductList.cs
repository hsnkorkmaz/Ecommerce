using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api.Json
{
    public class IcaProductList
    {
        [JsonProperty("items")]
        public List<IcaItem> Items;
    }
    public class IcaItem
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("type")]
        public string Type;
    }
}
