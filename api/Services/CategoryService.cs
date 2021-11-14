using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Entities;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly SqlContext _context;

        public CategoryService(SqlContext context)
        {
            _context = context;
        }

        public Task<List<Category>> GetAll()
        {
            var categories = _context.Categories.Where(x => x.CategoryId == null)
                .Include(x => x.ChildCategories)
                .ThenInclude(x => x.ChildCategories)
                .ToListAsync();

            return categories;
        }
    }
}
