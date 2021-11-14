using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Interfaces
{
    public interface IUserService
    {
        Task<User> Create(User user);
        Task<User> GetByEmail(string email);
        Task<User> GetById(int id);
    }
}
