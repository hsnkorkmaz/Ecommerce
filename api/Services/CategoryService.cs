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

        public async Task<List<Category>> GetAll()
        {
            var categories = await _context.Categories.Where(x => x.CategoryId == null)
                .Include(x => x.ChildCategories)
                .ThenInclude(x => x.ChildCategories)
                .ToListAsync();

            return categories;
        }

        public async Task<Category> GetById(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Category> InsertCategory(Category category)
        {
            await _context.Categories.AddAsync(category);
            category.Id = await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> UpdateCategory(Category category)
        {
            _context.Categories.Update(category);
            category.Id = await _context.SaveChangesAsync();
            return category;
        }
    }
}
