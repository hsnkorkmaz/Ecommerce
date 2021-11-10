using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly SqlContext _context;

        public UserRepository(SqlContext context)
        {
            _context = context;
        }

        public async Task<User> Create(User user)
        {
            await _context.Users.AddAsync(user);
            user.Id = await _context.SaveChangesAsync();
            return user;
        }
    }
}
