using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IcaController : Controller
    {
        private readonly IcaApiService _ica;

        public IcaController(IcaApiService ica)
        {
            _ica = ica;
        }

        [HttpGet("insertAllIcaData")]
        public async Task<ActionResult> InsertAllData()
        {
            await _ica.GetAllIcaData();
            return Ok();
        }

        //[HttpGet("getAllData")]
        //public async Task<ActionResult<List<Category>>> GetAllData()
        //{


        //    //returns categories with subcategories

        //    //var categories = _context.Categories.Where(x => x.CategoryId == null)
        //    //    .Include(x => x.ChildCategories)
        //    //    .ThenInclude(x => x.ChildCategories)
        //    //    .ToList();


        //    //var all = await _context.Categories.Where(x=> x.CategoryId == null).Include(x=> x.ChildCategories).ToListAsync();
        //    //var all = await _context.Categories.Where(x => x.CategoryId == null).Include(x=> x.ChildCategories).ThenInclude().ToListAsync();
            


        //    return Ok();
        //}
    }
}
