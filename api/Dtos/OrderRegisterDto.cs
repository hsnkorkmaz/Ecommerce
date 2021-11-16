using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class OrderRegisterDto
    {
        public string DeliveryAddress { get; set; }
        public List<OrderRegisterItemDto> ItemList { get; set; }
    }

}