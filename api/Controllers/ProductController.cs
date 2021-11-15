using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Interfaces;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }
        
        [HttpPost("getProducts")]
        public async Task<ActionResult> GetProducts(ProductRequestDto request)
        {
            var products = await _productService.GetWithDto(request);
            var productsDto = _mapper.Map<List<ProductDto>>(products);
            return Ok(productsDto);
        }
    }
}
