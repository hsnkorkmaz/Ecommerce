import React, { useEffect, useState } from 'react'
import { categoryApi } from '../../api/ApiConfig';
import { adminApi } from '../../api/ApiConfig';
import axios from 'axios';
import CategoryOption from './CategoryOption';
import CategoryItem from './CategoryItem';

const AdminCategories = () => {

    const [categories, setCategories] = useState(null);
    const [parentCategory, setParentCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    const [selectedCategory, setSelectedCategory] = useState(null);

    const getCategories = () => {
        axios.get(categoryApi + "categories")
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }


    useEffect(() => {
        if (selectedCategory != null && selectedCategory != "0") {

            axios.get(adminApi + "categoryById",
                { params: { id: selectedCategory } })
                .then(res => {
                    setCategoryName(res.data.name);
                    if (res.data.parentId != null) {
                        setParentCategory(res.data.parentId);
                    }
                    else {
                        setParentCategory(0);
                    }
                })
                .catch(err => {
                    console.log(err)
                });

           
        }
    }, [selectedCategory]);


    useEffect(() => {
        getCategories();
    }, []);


    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-start">
                <div className="max-h-screen overflow-y-scroll">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    {
                        categories?.map(category => {
                            return (
                                <div key={category.id}>
                                    <CategoryItem id={category.id} name={category.name} indent="-" selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                                    <div>
                                        {
                                            category.childCategories?.map(childCategory => {
                                                return (
                                                    <div key={childCategory.id}>
                                                        <CategoryItem id={childCategory.id} name={childCategory.name} indent="--" selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                                                        <div>
                                                            {
                                                                childCategory.childCategories?.map(grandChild => {
                                                                    return (
                                                                        <div key={grandChild.id}>
                                                                            <CategoryItem id={grandChild.id} name={grandChild.name} indent="---" selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="ml-7">
                    <h1 className="text-2xl font-bold">{selectedCategory ? "Update Category" : "Add New Category"}</h1>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                        setParentCategory(0);
                        setCategoryName('');
                        setSelectedCategory(null);
                    }}>
                        Cancel
                    </button>
                    <div className="mt-5">
                        <select className="block border border-grey-light p-3 rounded mb-4 w-full" value={parentCategory}
                            onChange={e => setParentCategory(e.target.value)}
                        >
                            <option value="0">Select Parent Category</option>
                            {
                                categories?.map(category => {
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
                        <input
                            type="text"
                            className="block border border-grey-light p-3 rounded mb-4 w-full"
                            placeholder="CategoryName" value={categoryName} required onChange={e => setCategoryName(e.target.value)} />

                        {selectedCategory
                            ? <div><button type="submit"
                                className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full"
                                onClick = {() => {
                                    axios.put(adminApi + "categoryUpdate", {
                                        id: selectedCategory,
                                        name: categoryName,
                                        parentId: parentCategory
                                    })
                                    .then(res => {
                                        getCategories();
                                        setCategoryName('');
                                        setParentCategory(0);
                                        setSelectedCategory(null);
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                                }}>
                                Update</button>
                                <button type="submit"
                                    className="text-center py-3 rounded bg-red-500 text-white hover:bg-red-dark focus:outline-none my-1 w-full"
                                    onClick={() => {
                                        axios.delete(adminApi + "categoryDelete", {
                                            params: {
                                                id: selectedCategory
                                            }
                                        })
                                        .then(res => {
                                            getCategories();
                                            setCategoryName('');
                                            setParentCategory(0);
                                            setSelectedCategory(null);
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        });
                                    }
                                    }>
                                    Delete</button>
                                </div>
                                

                            : <button
                                type="submit"
                                className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full"
                                onClick={() => {
                                    axios.post(adminApi + "categoryInsert", {
                                        name: categoryName,
                                        parentId: parentCategory
                                    })
                                        .then(res => {
                                            getCategories();
                                            setCategoryName('');
                                            setParentCategory(0);
                                            setSelectedCategory(null);
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        });
                                }}>
                                
                                Add</button>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminCategories
