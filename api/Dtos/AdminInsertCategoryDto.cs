using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class AdminInsertCategoryDto
    {
        public string Name { get; set; }
        public int? ParentId { get; set; }
    }
}
