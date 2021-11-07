import React from 'react'
import CategoryLink from './CategoryLink'
import Product from './Product'

const ProductList = () => {

    const [isLeftOpen, setLeftOpen] = React.useState(false)

    const mobileNavClass = "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 px-3 md:hidden z-50";


    return (
        <div>
            <div className="flex justify-evenly md:hidden">
                <div onClick={() => setLeftOpen(!isLeftOpen)} className="bg-green-600 text-white rounded-2xl p-2 ml-5">
                    <h1>Categories</h1>
                </div>
                <div onClick={() => setLeftOpen(!isLeftOpen)} className="bg-green-600 text-white rounded-2xl p-2 mr-5">
                    <h1>Filter</h1>
                </div>
                <div onClick={() => setLeftOpen(!isLeftOpen)} className="bg-green-600 text-white rounded-2xl p-2 mr-5">
                    <h1>Sort</h1>
                </div>
            </div>
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
                        <ul>
                            <li>
                                <CategoryLink category="Kött" subCategories={[{ name: "Sub1" }, { name: "Sub2" }, { name: "Sub3" }, { name: "Sub4" }]} />
                            </li>
                            <li>
                                <CategoryLink category="Fisk" subCategories={[{ name: "Sub11" }, { name: "Sub22" }]} />
                            </li>
                        </ul>
                    </div>
                </aside>
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
