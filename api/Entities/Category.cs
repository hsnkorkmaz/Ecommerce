using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Category> ChildCategories { get; set; }
        public int? CategoryId { get; set; }
        public List<Product> Products { get; set; }
    }
}
