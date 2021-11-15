using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class ProductRequestDto
    {
        public List<int> CategoryIds { get; set; }
        public List<int> ProductIds { get; set; }
        public string Name { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
        public string OrderType { get; set; }
    }
}
