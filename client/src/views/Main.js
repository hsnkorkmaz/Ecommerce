import React from 'react'
import Product from '../components/product/Product'

const Main = () => {
    return (
        <div>
            <div className="bg-yellow-200 ">
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
    )
}

export default Main
