import React, { useEffect, useState } from 'react'
import { categoryApi } from '../../api/ApiConfig';
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
        if (selectedCategory != null) {
            setCategoryName(selectedCategory);
        }
    }, [selectedCategory]);


    useEffect(() => {
        getCategories();
    }, []);


    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="max-h-screen overflow-y-scroll">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    {
                        categories?.map(category => {
                            return (
                                <div key={category.id}>
                                    <CategoryItem id={category.id} name={category.name} indent="-" setSelectedCategory={setSelectedCategory} />
                                    <div>
                                        {
                                            category.childCategories?.map(childCategory => {
                                                return (
                                                    <div key={childCategory.id}>
                                                        <CategoryItem id={childCategory.id} name={childCategory.name} indent="--" setSelectedCategory={setSelectedCategory} />
                                                        <div>
                                                            {
                                                                childCategory.childCategories?.map(grandChild => {
                                                                    return (
                                                                        <div key={grandChild.id}>
                                                                            <CategoryItem id={grandChild.id} name={grandChild.name} indent="---" setSelectedCategory={setSelectedCategory} />
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
                <div>
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
                            ? <button type="submit"
                                className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full">
                                Update</button>

                            : <button
                                type="submit"
                                className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full">
                                Add</button>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminCategories