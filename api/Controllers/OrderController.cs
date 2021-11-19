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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;
        private readonly IProductService _productService;

        public OrderController(IOrderService orderService, IMapper mapper, IJwtService jwtService, IProductService productService)
        {
            _orderService = orderService;
            _mapper = mapper;
            _jwtService = jwtService;
            _productService = productService;
        }


        [HttpPost("create")]
        public async Task<ActionResult> Create(OrderRegisterDto dto)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.ValidateToken(jwt);
            var userId = Convert.ToInt32(token.Issuer);
            
            var orderDb = new Order
            {
                UserId = userId,
                DeliveryAddress = dto.DeliveryAddress,
                OrderDate = DateTime.Now,
                TotalAmount = 0
            };

            foreach (var item in dto.ItemList)
            {
                var dbProduct = await _productService.GetWithId(item.ProductId);
                orderDb.TotalAmount += dbProduct.Price;

                orderDb.Products.Add(
                    new OrderProduct
                    {
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        ProductPrice = dbProduct.Price
                    });
            }
            
            await _orderService.Create(orderDb);
            return Ok("success");
        }

        [HttpGet("orders")]
        public async Task<ActionResult> Orders()
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.ValidateToken(jwt);
            var userId = Convert.ToInt32(token.Issuer);

            var orders = await _orderService.GetByUserId(userId);

            var ordersDto = _mapper.Map<List<OrderDto>>(orders);

            return Ok(ordersDto);
        }

    }
}
