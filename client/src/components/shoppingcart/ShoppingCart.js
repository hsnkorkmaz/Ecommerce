import React, { useState, useContext, useEffect, } from 'react'
import { Link, Navigate } from 'react-router-dom'
import CartItem from '../shoppingcart/CartItem';
import UserContext from '../../context/UserContext';
import ShoppingContext from '../../context/ShoppingContext';
import { authApi, orderApi } from '../../api/ApiConfig';
import axios from 'axios';
import Payment from './Payment';

const ShoppingCart = ({ isShoppingNav, setShoppingNav, totalCart }) => {
    const mobileNavClass = "transform top-0 right-0 bg-white fixed h-full overflow-auto transition-all ease-in-out duration-300 px-3 z-50 visible";

    const [checkOut, setCheckout] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState();
    const { cart, setCart } = useContext(ShoppingContext);
    const [deliveryAddress, setDeliveryAddress] = useState("");

    useEffect(() => {
        if (user === null) {
            setCurrentUser(null);
        } else {
            axios.get(authApi + 'user',
                { withCredentials: true })
                .then(function (response) {
                    setCurrentUser(response.data);
                })
        }
    }, []);




    const finalizeOrder = () => {

        let orderDetails = {
            "deliveryAddress": deliveryAddress,
            "itemList": []
        }

        cart.forEach(item => {
            orderDetails.itemList.push({
                "productId": item.productId,
                "quantity": item.quantity
            })
        });

        axios.post(orderApi + 'create', orderDetails,
            { withCredentials: true })
            .then(function (response) {
                setCart([]);
                setCheckout(true);
            })
    }



    return (
        <div>
            <div className={`transform top-0 left-0 w-full fixed h-full bg-gray-800 opacity-50 z-50 ${!isShoppingNav ? "hidden" : ""}`} onClick={() => {
                setShoppingNav(!isShoppingNav);
                setCheckout(false);
            }}></div>
            <aside className={isShoppingNav ? mobileNavClass : "opacity-0 w-0 h-0"}>
                <div className="flex items-center">
                    <h1 className="w-full my-2 sm:text-xl md:text-2xl font-bold leading-tight text-center text-gray-800">
                        Shopping Cart
                    </h1>
                    <div className=" cursor-pointer mr-2 flex items-center justify-center text-white md:hidden text-l px-2 bg-green-500 rounded-full" onClick={() => {
                        setShoppingNav(!isShoppingNav);
                        setCheckout(false);
                    }}>
                        X
                    </div>
                </div>

                <div className="w-full mb-4">
                    <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                </div>
                <div className="md:mt-5">
                    <div>
                        <span>You have <strong>{cart.length}</strong> items in the cart</span>
                        <ul>
                            <li>
                                {cart.map((item, index) => {
                                    return (
                                        <CartItem item={item} key={Math.random() + Date.now()} />
                                    )
                                })
                                }
                            </li>
                        </ul>
                    </div>
                    <div className={checkOut ? "text-xl" : "hidden"}>
                        Thank you for your order! <br />
                        <Link to="/profile" onClick={() => {
                            setShoppingNav(!isShoppingNav);
                            setCheckout(false);
                        }}>
                            <div className="mt-3 text-white w-full bg-green-600 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2 text-center items-center">
                                Check your order!
                            </div>
                        </Link>
                    </div>
                    <div className="mt-5">

                        <div className={user ? "hidden" : ""}>
                            <div>Please login to continue shopping</div>
                            <Link to="/login" onClick={() => {
                                setShoppingNav(!isShoppingNav);
                                setCheckout(false);
                            }}>
                                <div className="mt-3 text-white w-full bg-green-600 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2 text-center items-center">
                                    Login
                                </div>
                            </Link>
                        </div>

                        <div className={!user || cart.length == 0 ? "hidden" : "mb-80"}>
                            <span className="text-xl">Total Amount: <strong>{totalCart}</strong></span>
                            <Payment deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} />
                            <button type="button"
                                className="mt-3 text-white w-full bg-green-600 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2 text-center items-center"
                                onClick={() => finalizeOrder()}>
                                Checkout
                            </button>
                        </div>



                    </div>
                </div>
            </aside>
        </div>
    )
}

export default ShoppingCart
