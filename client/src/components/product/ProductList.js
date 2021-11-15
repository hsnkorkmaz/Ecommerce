import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList'
import Product from './Product'
import { productApi } from '../../api/ApiConfig'
import axios from 'axios'

const ProductList = () => {

    const defaultRequestData = {
        "categoryIds": [
            1
        ],
        "productIds": [
        ],
        "name": "",
        "skip": 0,
        "take": 50,
        "orderType": "asc"
    };

    const [isLeftOpen, setLeftOpen] = useState(false)
    const mobileNavClass = "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 px-3 md:hidden z-50";
    const [products, setProducts] = useState(null);
    const [productName, setProductName] = useState('');

    const getProducts = (data) => {
        axios.post(productApi + "getProducts",
            data)
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        getProducts(defaultRequestData);
    }, []);

    return (
        <div>
            <div className={`transform top-0 left-0 w-full fixed h-full bg-gray-800 opacity-50 z-40 ${!isLeftOpen ? "hidden" : ""}`} onClick={() => setLeftOpen(!isLeftOpen)}>
            </div>
            <div className="container mx-auto flex">
                <aside className={isLeftOpen ? mobileNavClass : "min-w-min mr-4 mt-3 hidden md:block"}>
                    <div className="flex items-center">
                        <h1 className="w-full my-2 sm:text-xl md:text-5xl font-bold leading-tight text-center text-gray-800">
                            Categories
                        </h1>
                        {/*     <div className="mr-5 md:hidden"  onClick={() => setLeftOpen(!isLeftOpen)}>
                            X
                        </div> */}
                    </div>

                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                    </div>
                    <div className="md:mt-10">
                        <CategoryList />
                    </div>
                </aside>
                <div className="w-full">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Products
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                    </div>
                    <div className="flex flex-wrap justify-start md:justify-between ml-5 lg:ml-0">
                        <div onClick={() => setLeftOpen(!isLeftOpen)}
                            className="bg-green-400 text-white rounded-md p-2 mr-5 w-full md:hidden">
                            <h1>Categories</h1>
                        </div>
                        <div className=" p-2 mr-5 flex items-center w-full lg:w-auto">
                            <span className="w-16">Search:</span>
                            <input className="border rounded-md p-2 w-full lg:w-auto focus:outline-none" type="text" placeholder="Search for item" onKeyUp={(e) => {
                                setProductName(e.target.value);

                                if (e.target.value.length > 2) {
                                    let newRqData = defaultRequestData;
                                    newRqData.name = e.target.value;
                                    newRqData.categoryIds = [];
                                    newRqData.productIds = [];
                                    getProducts(newRqData);
                                }

                                if (e.target.value.length == 0) {
                                    getProducts(defaultRequestData);
                                }
                            }} />
                        </div>
                        <div className="p-2 mr-5 flex items-center w-full lg:w-auto">
                            <span className="w-16">Sort:</span>
                            <select className="border rounded-md p-2 text-gray-400 focus:text-gray-600 w-full lg:w-auto" onChange={
                                (e) => {
                                    let newRqData = defaultRequestData;
                                    newRqData.orderType = e.target.value;
                                    
                                    if (productName.length > 0) {
                                        newRqData.name = productName;
                                        newRqData.categoryIds = [];
                                    }
                                    getProducts(newRqData);
                                }
                            }>
                                <option value="asc">Price: Low to High</option>
                                <option value="desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="mx-auto container py-8">
                            <div className="flex flex-wrap items-start lg:justify-center justify-center">

                                {
                                    products && products.map(product => {
                                        return (
                                            <Product key={product.id} product={product} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
