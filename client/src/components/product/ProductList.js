import React from 'react'
import CategoryLink from './CategoryLink'
import Product from './Product'

const ProductList = () => {
    return (
        <div>
            <div className="container mx-auto flex">
             
                <div className="min-w-min mr-4 hidden md:block">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Categories
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                    </div>
                    <div className="mt-10">
                        <ul>
                            <li>
                               <CategoryLink category="Kött" subCategories={[{name:"Sub1"}, {name: "Sub2"}, {name: "Sub3"}, {name: "Sub4"}]} />
                            </li>
                            <li>
                               <CategoryLink category="Fisk" subCategories={[{name:"Sub11"}, {name: "Sub22"}]}/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Products
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                    </div>
                    <div>
                        <div className="mx-auto container py-8">
                            <div className="flex flex-wrap items-center lg:justify-center justify-center">
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
