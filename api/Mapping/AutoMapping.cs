using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Entities;
using AutoMapper;

namespace api.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Product, ProductDto>();
        }
    }
}
