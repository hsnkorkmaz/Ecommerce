import React, { useEffect, useState } from 'react'
import { categoryApi } from '../../api/ApiConfig';
import { adminApi, productApi } from '../../api/ApiConfig';
import axios from 'axios';
import CategoryOption from './CategoryOption';
import CategoryItem from './CategoryItem';
import AdminResultProductItem from './AdminResultProductItem';
import ProductCategoryButton from './ProductCategoryButton';

const AdminProducts = () => {

    const [searchCategories, setSearchCategories] = useState(null);
    const [searchProductName, setSearchProductName] = useState('');
    const [searchProductId, setSearchProductId] = useState('');
    const [searchCategoryId, setSearchCategoryId] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [productName, setProductName] = useState('');
    const [imageName, setImageName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productCategories, setProductCategories] = useState([]);
    const [addCategoryId, setAddCategoryId] = useState(0);


    const defaultRequestData = {
        "categoryIds": [],
        "productIds": [],
        "name": "",
        "skip": 0,
        "take": 50,
        "orderType": "asc"
    };

    const getProducts = (data) => {
        axios.post(productApi + "getProducts",
            data)
            .then(res => {
                setSearchResults(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }


    const getCategories = () => {
        axios.get(categoryApi + "categories",)
            .then(res => {
                setSearchCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        getCategories();
    }, []);


    useEffect(() => {
        if (addCategoryId !== null && addCategoryId !== 0) {
            let newProductCategories = [...productCategories];
            
            axios.get(adminApi + "categoryById",
                { params: { id: addCategoryId } })
                .then(res => {
                    if (newProductCategories.find(productCategory => productCategory.id == addCategoryId)) {
                        alert("Category is already added");
                        setAddCategoryId(0);
                        return;
                    }
                    newProductCategories.push(res.data);
                    setProductCategories(newProductCategories);
                    setAddCategoryId(0);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }, [addCategoryId]);


    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.name);
            setImageName(selectedProduct.imageName);
            setPrice(selectedProduct.price);
            setDescription(selectedProduct.description);

            axios.get(adminApi + "categoriesByProductId",
                { params: { id: selectedProduct.id } })
                .then(res => {
                    setProductCategories(res.data)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (searchCategoryId) {
            defaultRequestData.categoryIds = [searchCategoryId];
        }
        if (searchProductId) {
            defaultRequestData.productIds = [searchProductId];
        }
        if (searchProductName && searchProductName.length > 2) {
            defaultRequestData.name = searchProductName;
        }
        getProducts(defaultRequestData);
    }, [searchCategoryId, searchProductId, searchProductName]);


    const resetSearch = () => {
        setSearchProductName('');
        setSearchProductId('');
        setSearchCategoryId(0);
    }

    const resetStates = () => {
        setSelectedProduct(null);
        setProductName('');
        setImageName('');
        setPrice('');
        setDescription('');
        setProductCategories([]);
        setAddCategoryId(0);
        resetSearch();
    }


    return (
        <div className="mt-10">
            <div className="flex flex-col md:flex-row md:justify-start">
                <div className="max-h-screen overflow-y-scroll">
                    <h1 className="text-2xl font-bold mb-3">Search Product</h1>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                            resetSearch();
                        }}>
                            Reset Search Criteria
                        </button>
                        <div>
                            Category:
                        </div>
                        <div>
                            <select className="block border border-grey-light p-3 rounded mb-4 w-full" value={searchCategoryId}
                                onChange={e => setSearchCategoryId(e.target.value)}>
                                <option value="0">Select Category</option>
                                {
                                    searchCategories?.map(category => {
                                        return (
                                            <>
                                                <CategoryOption key={category.id} id={category.id} name={category.name} indent="-" />
                                                {
                                                    category.childCategories?.map(childCategory => {
                                                        return (
                                                            <>
                                                                <CategoryOption key={childCategory.id} id={childCategory.id} name={childCategory.name} indent="--" />
                                                                {
                                                                    childCategory.childCategories?.map(grandChild => {
                                                                        return (
                                                                            <CategoryOption key={grandChild.id} id={grandChild.id} name={grandChild.name} indent="---" />
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            Product Name:
                        </div>
                        <div>
                            <input
                                type="text"
                                className="block border border-grey-light p-3 rounded mb-4 w-full"
                                placeholder="Product Name" value={searchProductName} onChange={e => setSearchProductName(e.target.value)} />
                        </div>
                        <div>
                            Product Id:
                        </div>
                        <div>
                            <input
                                type="number"
                                className="block border border-grey-light p-3 rounded mb-4 w-full"
                                placeholder="Product Id" value={searchProductId} onChange={e => setSearchProductId(e.target.value)} />
                        </div>
                    </div>
                    {searchResults ?
                        <div>
                            Search Results:
                            {
                                searchResults?.map(product => {
                                    return (
                                        <AdminResultProductItem key={product.id} product={product} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                                    )
                                })
                            }
                        </div>
                        :
                        null
                    }

                </div>

                <div className="ml-7 md:w-2/5">
                    <h1 className="text-2xl font-bold">{selectedProduct ? "Update Product" : "Add New Product"}</h1>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-5" onClick={() => {
                        resetStates();
                    }}>
                        Cancel
                    </button>


                    <div className="">
                        <div>Add Category:</div>
                        <div> <select className="block border border-grey-light p-3 rounded mb-4 w-full" value={addCategoryId}
                            onChange={e => setAddCategoryId(e.target.value)}>
                            <option value="0">Select Category to Add</option>
                            {
                                searchCategories?.map(category => {
                                    return (
                                        <>
                                            <CategoryOption key={category.id} id={category.id} name={category.name} indent="-" />
                                            {
                                                category.childCategories?.map(childCategory => {
                                                    return (
                                                        <>
                                                            <CategoryOption key={childCategory.id} id={childCategory.id} name={childCategory.name} indent="--" />
                                                            {
                                                                childCategory.childCategories?.map(grandChild => {
                                                                    return (
                                                                        <CategoryOption key={grandChild.id} id={grandChild.id} name={grandChild.name} indent="---" />
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                })
                            }
                        </select>
                        </div>
                        <div>Product Categories</div>
                        {productCategories?.map(category => {
                            return <ProductCategoryButton key={category.id} id={category.id} name={category.name} productCategories={productCategories} setProductCategories={setProductCategories} />
                        })
                        }
                    </div>

                    {imageName !== '' ?
                        <div className="flex relative bg-orange-500 justify-center items-center m-1 mr-2 w-36 h-36 mt-1 rounded-full">
                            <img alt={imageName} src={"https://assets.icanet.se/t_product_medium_v1,f_auto/" + imageName + ".jpg"} />
                        </div>
                        : null
                    }


                    <input
                        type="text"
                        className="block border border-grey-light p-3 rounded mb-4 w-full"
                        placeholder="Image Name" value={imageName} onChange={e => setImageName(e.target.value)} />

                    <input
                        type="text"
                        className="block border border-grey-light p-3 rounded mb-4 w-full"
                        placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} />

                    <input
                        type="text"
                        className="block border border-grey-light p-3 rounded mb-4 w-full"
                        placeholder="Product Price" value={price} onChange={e => setPrice(e.target.value)} />
                    <textarea
                        type="text"
                        className="block border border-grey-light p-3 rounded mb-4 w-full h-52"
                        placeholder="Product Description" value={description} onChange={e => setDescription(e.target.value)} />

                    {selectedProduct
                        ? <div><button type="submit"
                            className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full"
                            onClick={() => {
                                axios.put(adminApi + "productUpdate", {
                                    id: selectedProduct.id,
                                    name: productName,
                                    
                                    imageName: imageName,
                                    price: price,
                                    description: description,
                                    categories: productCategories.map(category => category.id)
                                })
                                    .then(res => {
                                        resetStates();
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                            }}>
                            Update</button>

                            <button type="submit"
                                className="text-center py-3 rounded bg-red-500 text-white hover:bg-red-dark focus:outline-none my-1 w-full"
                                        /* onClick={() => {
                                            axios.delete(adminApi + "categoryDelete", {
                                                params: {
                                                    id: selectedCategory
                                                }
                                            })
                                                .then(res => {
                                                    getCategories();
                                                    resetStates();
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                });
                                        }
                                        } */>
                                Delete</button>
                        </div>


                        : <button
                            type="submit"
                            className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full"
                                 onClick={() => {
                                    axios.post(adminApi + "productInsert", {
                                        name: productName,
                                        imageName: imageName,
                                        price: price,
                                        description: description,
                                        categories: productCategories.map(category => category.id)
                                    })
                                        .then(res => {
                                            resetStates();
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        });
                                }}>

                            Add</button>}


                </div>
            </div>

        </div>
    )
}

export default AdminProducts
