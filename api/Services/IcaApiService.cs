using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.Json;
using Newtonsoft.Json;

namespace api.Services
{
    public class IcaApiService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly SqlContext _context;

        public IcaApiService(IHttpClientFactory clientFactory, SqlContext context)
        {
            _clientFactory = clientFactory;
            _context = context;
        }

        public async Task<string> GetFromApi(string requestUri)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, requestUri);
            var client = _clientFactory.CreateClient();
            var response = await client.SendAsync(request);
            var responseString = await response.Content.ReadAsStringAsync();
            return responseString;
        }

        public async Task GetAllIcaData()
        {
            if (!_context.Categories.Any())
            {
                var categoriesFilePath = "Json/IcaCategories.json";
                if (!File.Exists(categoriesFilePath))
                {
                    throw new FileNotFoundException();
                }

                var jsonCategories = await File.ReadAllTextAsync(categoriesFilePath, Encoding.GetEncoding("iso-8859-1"));
                var categories = JsonConvert.DeserializeObject<List<IcaCategory>>(jsonCategories,
                    new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Serialize });

                await InsertIcaCategories(categories, 0);
            }

            if (!_context.Products.Any())
            {
                var productsFilePath = "Json/IcaAllProducts.json";
                if (!File.Exists(productsFilePath))
                {
                    throw new FileNotFoundException();
                }

                var jsonProducts = await File.ReadAllTextAsync(productsFilePath, Encoding.GetEncoding("iso-8859-1"));
                var products = JsonConvert.DeserializeObject<List<IcaProduct>>(jsonProducts);

                //insert 500 products
                await InsertIcaProducts(products.Take(500).ToList());
            }
            



            //var productIdsFilePath = "Json/IcaProductIds.json";
            //if (!File.Exists(productIdsFilePath))
            //{
            //    throw new FileNotFoundException();
            //}

            //var jsonProductIds = await File.ReadAllTextAsync(productIdsFilePath);
            //var productIds = JsonConvert.DeserializeObject<List<IcaItem>>(jsonProductIds);


            //var idList = new List<string>();
            //string apiIds = "";


            //for (int i = 0; i < productIds.Count/50; i++)
            //{
            //    var hundredId = productIds.Skip(50 * i).Take(50).ToList();

            //    foreach (var id in hundredId)
            //    {
            //        apiIds += id.Id + ",";
            //    }
            //    idList.Add(apiIds);
            //    apiIds = "";
            //}


            //var allProducts = new List<IcaProduct>();

            //foreach (var id in idList)
            //{
            //    var productsJson = await GetFromApi(
            //        "https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/maxi-ica-stormarknad-malmo-id_02748/products-data?skus="
            //        + id);
            //    var products = JsonConvert.DeserializeObject<List<IcaProduct>>(productsJson);
            //    allProducts.AddRange(products);
            //}


            //var jsonProducts = JsonConvert.SerializeObject(allProducts);



            //List<string> productIds = new List<string>();
            //List<Item> productItems = new List<Item>();

            //foreach (var category in categories)
            //{
            //    var jsonProductList = await GetFromApi(
            //        "https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/maxi-ica-stormarknad-malmo-id_02748/products?categories="
            //        + category.CategoryId);

            //    var products = JsonConvert.DeserializeObject<IcaProductList>(jsonProductList);

            //    foreach (var product in products.Items)
            //    {
            //        productItems.Add(product);
            //        productIds.Add(product.Id);
            //    }
            //}


            //var jsonList = JsonConvert.SerializeObject(productItems);
            //string asdsd = "";
            //foreach (var productItem in productItems)
            //{
            //    asdsd += productItem.Id + ",";
            //}
        }



        public async Task InsertIcaCategories(List<IcaCategory> categories, int topId)
        {
            foreach (var category in categories)
            {
                var dbCategory = new Category
                {
                    Name = category.Name
                };

                if (topId != 0)
                {
                    dbCategory.CategoryId = topId;
                }

                await _context.Categories.AddAsync(dbCategory);
                await _context.SaveChangesAsync();

                await InsertIcaCategories(category.ChildCategories, dbCategory.Id);
            }
        }

        public async Task InsertIcaProducts(List<IcaProduct> products)
        {
            foreach (var product in products)
            {
                var dbProduct = new Product
                {
                    Name = product.Name,
                    ImageName = product.CloudinaryImageId,
                    Description = product.DescriptionLong,
                    Price = Convert.ToDecimal(product.Price)
                };


                var categories = new List<Category>();
                foreach (var inCategory in product.InCategories)
                {
                    foreach (var path in inCategory.Path)
                    {
                        var dbCategory = _context.Categories.FirstOrDefault(x => x.Name == path.Name);

                        if (dbCategory != null)
                        {
                            categories.Add(dbCategory);
                        }
                    }
                }

                dbProduct.Categories = categories;
                await _context.Products.AddAsync(dbProduct);
                await _context.SaveChangesAsync();
            }
        }
    }
}
