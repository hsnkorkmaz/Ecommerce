using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Interfaces;

namespace api.Services
{
    public class MetricService : IMetricService
    {
        private readonly SqlContext _context;

        public MetricService(SqlContext context)
        {
            _context = context;
        }
        public async Task<List<MetricDto>> GetMetrics()
        {
            var userCount = _context.Users.Count();
            var productCount = _context.Products.Count();
            var categoryCount = _context.Categories.Count();
            var orderCount = _context.Orders.Count();
            var totalRevenue = _context.Orders.Sum(x => x.TotalAmount);
            var waitingDelivery = _context.Orders.Count(x => x.IsDelivered == false);
            var deliveredCount = _context.Orders.Count(x => x.IsDelivered == true);

            var metrics = new List<MetricDto>()
            {
                new MetricDto() { Name = "Total Users", Value = userCount.ToString() },
                new MetricDto() { Name = "Total Products", Value = productCount.ToString() },
                new MetricDto() { Name = "Total Categories", Value = categoryCount.ToString() },
                new MetricDto() { Name = "Total Revenue", Value = totalRevenue + " kr" },
                new MetricDto() { Name = "Total Orders", Value = orderCount.ToString() },
                new MetricDto() { Name = "Orders Waiting Delivery", Value = waitingDelivery.ToString() },
                new MetricDto() { Name = "Orders Delivered", Value = deliveredCount.ToString() },
            };

            return metrics;
        }
    }
}
