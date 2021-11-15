import React,{useContext} from 'react'
import ShoppingContext from '../../context/ShoppingContext'

const Product = (props) => {
    
    const {cart, setCart} = useContext(ShoppingContext);

    return (
        <div className="mx-2 w-36 md:w-48 lg:mb-6 mb-6 hover:border-pink-600 hover:shadow-md bg-white rounded-md border-t-2 border-green-200">
            <div className="flex items-center justify-center p-1">
                <img className="w-full" src={"https://assets.icanet.se/t_product_medium_v1,f_auto/" + props.product.imageName + ".jpg"} alt={props.product.name} />
            </div>
            <div className="rounded-b-md">
                <div className="p-4">
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-thin">{props.product.name}</h3>
                        <span className="text-xl font-semibold">{props.product.price} kr</span>
                        <button id={props.product.id} type="button" className="text-white bg-green-600 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2 text-center inline-flex items-center"
                        onClick={(e) => {
                            setCart(cart => [...cart, {
                                productId: props.product.id,
                                imageName: props.product.imageName,
                                name: props.product.name,
                                price: props.product.price,
                                totalPrice: props.product.price,
                                quantity: 1,
                              }]);
                        }}
                        
                        >
                            <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                            Buy now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product
