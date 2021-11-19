using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public List<OrderProductDto> Products { get; set; }
        public string DeliveryAddress { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsDelivered { get; set; } = false;
        public DateTime? DeliveryDate { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
