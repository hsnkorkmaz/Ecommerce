﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class AdminUpdateProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageName { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public List<int> Categories { get; set; }
    }
}
