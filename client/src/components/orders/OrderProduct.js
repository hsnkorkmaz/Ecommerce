import React from 'react'

const OrderProduct = (props) => {
    return (
        <div>
            <div className="mx-2 mb-2 hover:border-pink-600 hover:shadow-md bg-white rounded-md border-t-2 border-green-200 flex cursor-pointer">
                <div className="flex items-center justify-center p-1">
                    <img src={"https://assets.icanet.se/t_product_small_v1,f_auto/" + props.product.product.imageName + ".jpg"} alt={props.product.product.name} />
                </div>
                <div className="rounded-b-md">
                    <div className="p-4">
                        <div className="flex flex-col">
                            <h3 className="text-xs font-semibold">{props.product.product.name}</h3>
                            <span className="text-xs">Price: {props.product.productPrice} kr</span>
                            <span className="text-xs">Quantity: {props.product.quantity} kr</span>
                        </div>

                    </div>
                </div>
                <div className="hidden md:block pl-4 w-2/3" dangerouslySetInnerHTML={{ __html: props.product.product.description?.substring(0, 200) }}>
                </div>
            </div>
        </div>
    )
}

export default OrderProduct
