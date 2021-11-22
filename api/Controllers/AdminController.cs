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
        private readonly IMetricService _metricService;
        private readonly IMapper _mapper;

        public AdminController(ICategoryService categoryService, IProductService productService, IOrderService orderService, IMetricService metricService, IMapper mapper)
        {
            _categoryService = categoryService;
            _productService = productService;
            _orderService = orderService;
            _metricService = metricService;
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
                ParentId = category.CategoryId,
                HasChildCategory = await _categoryService.HasChildren(category.Id),
                HasProducts = await _categoryService.HasProducts(category.Id)
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


        [HttpDelete("categoryDelete")]
        public async Task<ActionResult> CategoryDelete(int id)
        {
            var deleted = await _categoryService.DeleteCategory(id);

            return Ok("success");
        }


        [HttpGet("metrics")]
        public async Task<ActionResult> Metrics()
        {
            return Ok(await _metricService.GetMetrics());
        }
    }
}
