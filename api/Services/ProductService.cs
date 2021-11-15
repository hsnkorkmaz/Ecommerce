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
    public class ProductService : IProductService
    {
        private readonly SqlContext _context;

        public ProductService(SqlContext context)
        {
            _context = context;
        }

        public async Task<Product> GetById(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Product>> GetByName(string name)
        {
            return await _context.Products.Where(x => x.Name.Contains(name)).ToListAsync();
        }

        public async Task<List<Product>> GetByCategories(List<int> categoryIds)
        {
            return await _context.Products.Where(x => x.Categories.Any(y => categoryIds.Contains(y.Id))).ToListAsync();
        }

        public async Task<List<Product>> GetByCategoryId(int categoryId)
        {
            var result = await _context.Products.SelectMany(x => x.Categories.Where(y => y.CategoryId == categoryId)).SelectMany(z => z.Products).Distinct().ToListAsync();

            //var resultWithoutChildCategories = await _context.Products.Where(x => x.Categories.Any(y => y.CategoryId == categoryId)).ToListAsync();
            return result;
        }

        public async Task<List<Product>> GetWithDto(ProductRequestDto requestDto)
        {
            var result = new List<Product>();
            if (requestDto.Name != "")
            {
                if (requestDto.OrderType == "desc")
                {
                    result = await _context.Products.Where(x => x.Name.StartsWith(requestDto.Name)).OrderByDescending(x => x.Price).Skip(requestDto.Skip).Take(requestDto.Take).ToListAsync();
                }
                if (requestDto.OrderType == "asc")
                {
                    result = await _context.Products.Where(x => x.Name.StartsWith(requestDto.Name)).OrderBy(x => x.Price).Skip(requestDto.Skip).Take(requestDto.Take).ToListAsync();
                }
            }

            if (requestDto.ProductIds.Count > 0)
            {
                if (requestDto.OrderType == "desc")
                {
                    result = await _context.Products.Where(x => requestDto.ProductIds.Contains(x.Id)).OrderByDescending(x => x.Price).Skip(requestDto.Skip).Take(requestDto.Take).ToListAsync();
                }
                if (requestDto.OrderType == "asc")
                {
                    result = await _context.Products.Where(x => requestDto.ProductIds.Contains(x.Id)).OrderBy(x => x.Price).Skip(requestDto.Skip).Take(requestDto.Take).ToListAsync();
                }
            }

            if (requestDto.CategoryIds.Count > 0)
            {
                if (requestDto.OrderType == "desc")
                {
                    result = await _context.Products.SelectMany(x =>
                        x.Categories)
                            .Where(y => y.CategoryId != null && requestDto.CategoryIds.Contains((int)y.CategoryId))
                            .SelectMany(z => z.Products).Distinct().OrderByDescending(p => p.Price)
                            .Skip(requestDto.Skip).Take(requestDto.Take).ToListAsync();
                }
                if (requestDto.OrderType == "asc")
                {
                    result = await _context.Products.SelectMany(x =>
                            x.Categories)
                                .Where(y => y.CategoryId != null && requestDto.CategoryIds.Contains((int)y.CategoryId))
                                .SelectMany(z => z.Products).Distinct().OrderBy(p => p.Price)
                                .Skip(requestDto.Skip).Take(requestDto.Take).ToListAsync();
                }
            }

            return result;
        }
    }
}
