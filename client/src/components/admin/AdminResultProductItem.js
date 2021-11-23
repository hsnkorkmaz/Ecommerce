import React from 'react'

const AdminResultProductItem = ({product, selectedProduct, setSelectedProduct}) => {
    return (
        <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
        onClick={(e) => {setSelectedProduct(product)}}>
            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                <div className="w-6 flex flex-col items-center">
                    <div className="flex relative bg-orange-500 justify-center items-center m-1 mr-2 w-7 h-7 mt-1 rounded-full ">
                        <img className="" alt={product.name} src={"https://assets.icanet.se/t_product_small_v1,f_auto/" + product.imageName + ".jpg"} />
                    </div>
                </div>
                <div className="w-full items-center flex">
                    <div className="mx-2 -mt-1  ">
                        {product.name}
                        <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">{product.price} kr</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminResultProductItem
