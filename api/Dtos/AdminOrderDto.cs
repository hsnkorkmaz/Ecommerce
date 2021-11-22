using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class AdminOrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string DeliveryAddress { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsDelivered { get; set; } = false;
        public DateTime? DeliveryDate { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
