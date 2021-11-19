using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class OrderService : IOrderService
    {
        private readonly SqlContext _context;

        public OrderService(SqlContext context)
        {
            _context = context;
        }
        public async Task<Order> Create(Order order)
        {
            await _context.Orders.AddAsync(order);
            order.Id = await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order> GetById(int id)
        {
             return await _context.Orders.Where(x => x.UserId == id).Include(x => x.Products).ThenInclude(y=> y.Product).FirstOrDefaultAsync();
        }

        public async Task<List<Order>> GetByUserId(int id)
        {
            return await _context.Orders.Where(x => x.UserId == id).Include(x => x.Products).ThenInclude(y=> y.Product).ToListAsync();
        }
    }
}
