using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Entities;

namespace api.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>> GetWithDto(ProductRequestDto requestDto);
    }
}
