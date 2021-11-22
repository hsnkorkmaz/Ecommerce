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
    }
}
