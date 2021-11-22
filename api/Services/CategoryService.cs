using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
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

        public async Task<int> DeleteCategory(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync();
        }

        public async Task<bool> HasProducts(int id)
        {
            return await _context.Products.AnyAsync(x => x.Categories.Contains(new Category() { Id = id }));
        }

        public async Task<bool> HasChildren(int id)
        {
            return await _context.Categories.AnyAsync(x => x.CategoryId == id);
        }
    }
}
