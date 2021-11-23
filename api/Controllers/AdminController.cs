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


        [HttpGet("categoriesByProductId")]
        public async Task<ActionResult> CategoriesByProductId(int id)
        {
            var categories = await _categoryService.GetAllByProductId(id);
            var categoriesDto = _mapper.Map<List<CategoryDto>>(categories);
            return Ok(categoriesDto);
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

        [HttpGet("orders")]
        public async Task<ActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAll();
            var ordersDto = _mapper.Map<List<AdminOrderDto>>(orders);
            return Ok(ordersDto);
        }

        [HttpGet("orderById")]
        public async Task<ActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetById(id);
            var orderDto = _mapper.Map<OrderDto>(order);
            return Ok(orderDto);
        }

        [HttpGet("orderDeliver")]
        public async Task<ActionResult> OrderDeliver(int id)
        {
            var order = await _orderService.DeliverOrder(id);
            var orderDto = _mapper.Map<OrderDto>(order);
            return Ok(orderDto);
        }


        [HttpPost("productInsert")]
        public async Task<ActionResult> ProductInsert(AdminInsertProductDto dto)
        {

            var dbProduct = new Product
            {
                Name = dto.Name,
                ImageName = dto.ImageName,
                Description = dto.Description,
                Price = Convert.ToDecimal(dto.Price)
            };
            var categories = new List<Category>();




            foreach (var categoryId in dto.Categories)
            {
                var dbCategory = await _categoryService.GetById(categoryId);
                categories.Add(dbCategory);
            }

            dbProduct.Categories = categories;

            await _productService.InsertProduct(dbProduct);

            return Ok("success");

        }

        [HttpPut("productUpdate")]
        public async Task<ActionResult> ProductUpdate(AdminUpdateProductDto dto)
        {

            var dbProduct = await _productService.GetWithId(dto.Id);

            dbProduct.Name = dto.Name;
            dbProduct.ImageName = dto.ImageName;
            dbProduct.Description = dto.Description;
            dbProduct.Price = Convert.ToDecimal(dto.Price);

            var categories = new List<Category>();
            
            foreach (var categoryId in dto.Categories)
            {
                var dbCategory = await _categoryService.GetById(categoryId);
                dbCategory.ChildCategories = null;
                categories.Add(dbCategory);
            }


            dbProduct.Categories = categories;

            await _productService.UpdateProduct(dbProduct);

            return Ok("success");
        }
    }
}
