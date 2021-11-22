using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.Interfaces
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAll();
        Task<Category> GetById(int id);

        Task<Category> InsertCategory(Category category);
        Task<Category> UpdateCategory(Category category);
        Task<int> DeleteCategory(int id);
        Task<bool> HasProducts(int id);
        Task<bool> HasChildren(int id);

    }
}
