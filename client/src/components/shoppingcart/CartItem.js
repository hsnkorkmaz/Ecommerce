import React, { useContext } from 'react'
import ShoppingContext from '../../context/ShoppingContext';

const CartItem = ({ item }) => {

    const { cart, setCart } = useContext(ShoppingContext);


    const incrementQuantity = (id) => {
        cart.forEach(item => {
            if (item.productId === id) {
                item.quantity += 1;
                item.totalPrice = Math.round( item.price * item.quantity * 1e2 ) / 1e2;
            }
        });
        setCart([...cart]);
    }

    const decrementQuantity = (id) => {
        cart.forEach(item => {
            if (item.productId === id) {
                if (item.quantity-1 !== 0) {
                    item.quantity -= 1;
                    item.totalPrice = Math.round( item.price * item.quantity * 1e2 ) / 1e2;
                }
                else
                {
                    cart.splice(cart.indexOf(item), 1);
                }
            }
        });
        setCart([...cart]);
    }


    return (
        <div className="flex border-2 my-2 p-2">
            <div>
                <img className="w-full" src={"https://assets.icanet.se/t_product_small_v1,f_auto/" + item.imageName + ".jpg"} alt={item.name} />
            </div>
            <div className="flex flex-col ml-2">
                <span>{item.name}</span>
                <span>{item.totalPrice} kr</span>
                <div className="flex flex-row h-8 w-44 rounded-lg relative bg-transparent mt-1">
                    <button onClick={() => decrementQuantity(item.productId)} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                        <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input type="number" value={item.quantity} className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" ></input>
                    <button onClick={() => incrementQuantity(item.productId)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                        <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CartItem
