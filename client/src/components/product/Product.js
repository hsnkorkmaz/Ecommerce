import React from 'react'

const Product = () => {
    return (
        <div className="mx-2 w-48 lg:mb-6 mb-6">
            <div className="bg-white flex items-center justify-center rounded-md">
                <img className="w-36" src="https://assets.icanet.se/t_product_medium_v1,f_auto/7300206787006.jpg"/>
            </div>
            <div className="bg-white rounded-b-md">
                <div className="p-4">
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-thin">Falukorv Klassiker 800g Scan</h3>
                        <span className="text-2xl font-semibold">33,95 kr</span>
                       <span>Add to cart</span>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Product
