import React from 'react'

const OrderProductCard = ({orderProduct}) => {
    return (
        <div className="mx-2 w-36 md:w-48 lg:mb-6 mb-6 hover:border-pink-600 hover:shadow-md bg-white rounded-md border-t-2 border-green-200">
            <div className="flex items-center justify-center p-1">
                <img src={"https://assets.icanet.se/t_product_small_v1,f_auto/" + orderProduct.product.imageName + ".jpg"} alt={orderProduct.product.name} />
            </div>
            <div className="rounded-b-md">
                <div className="p-4">
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-sm font-thin">{orderProduct.quantity} x {orderProduct.product.name}</h3>
                        <span className="text-sm font-semibold">{orderProduct.productPrice} kr</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderProductCard
