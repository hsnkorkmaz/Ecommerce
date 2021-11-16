using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Interfaces
{
    public interface IOrderService
    {
        Task<Order> Create(Order order);
        Task<Order> GetById(int id);
        Task<List<Order>> GetByUserId(int id);
    }
}
