using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class OrderRegisterItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
