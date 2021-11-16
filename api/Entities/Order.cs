using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public List<OrderProduct> Products { get; set; } = new List<OrderProduct>();

        [Required]
        [MaxLength(200)]
        public string DeliveryAddress { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsDelivered { get; set; } = false;
        public DateTime? DeliveryDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
    }
}
