using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Entities;
using api.Interfaces;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public AdminController(ICategoryService categoryService, IProductService productService, IOrderService orderService, IMapper mapper)
        {
            _categoryService = categoryService;
            _productService = productService;
            _orderService = orderService;
            _mapper = mapper;
        }
        
        [HttpGet("categoryById")]
        public async Task<ActionResult> CategoryById(int id)
        {
            var category = await _categoryService.GetById(id);

            var categoryDto = new AdminCategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
                ParentId = category.CategoryId
            };

            return Ok(categoryDto);
        }


        [HttpPost("categoryInsert")]
        public async Task<ActionResult> CategoryInsert(AdminInsertCategoryDto dto)
        {
            if (dto.ParentId == 0)
            {
                dto.ParentId = null;
            }

            var newCategory = new Category()
            {
                Name = dto.Name,
                CategoryId = dto.ParentId
            };

            return Created("success", await _categoryService.InsertCategory(newCategory));

        }

        [HttpPut("categoryUpdate")]
        public async Task<ActionResult> CategoryUpdate(AdminUpdateCategoryDto dto)
        {
            if (dto.ParentId == 0)
            {
                dto.ParentId = null;
            }

            var newCategory = new Category()
            {
                Id = dto.Id,
                Name = dto.Name,
                CategoryId = dto.ParentId
            };

            return Created("success", await _categoryService.UpdateCategory(newCategory));

        }
    }
}
