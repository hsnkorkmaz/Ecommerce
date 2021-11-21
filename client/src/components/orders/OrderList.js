import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { orderApi } from '../../api/ApiConfig';
import OrderProduct from './OrderProduct';

const OrderList = () => {

    const [orders, setOrders] = useState([]);

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    const getOrders = () => {
        axios.get(orderApi + "orders",
            { withCredentials: true })
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }


    useEffect(() => {
        getOrders();
    }, []);
    return (
        <div>
            {
                orders && orders.map(order => {
                    return (
                        <div className="bg-green-100 rounded-lg p-3 mb-3 shadow-sm">
                            <div key={order.id + order.totalAmount} className="flex-col text-xs">
                                <div className="p-2 rounded-xl bg-green-400 text-center text-white font-medium mb-3">
                                    {order.isDelivered ? "Delivered" : "Processing"}
                                </div>
                                <div>
                                    <strong>Order Id:</strong> {order.id}
                                </div>
                                <div>
                                    <strong>Order Date:</strong> {formatDate(order.orderDate)}
                                </div>
                                <div>
                                    <strong>Delivery Address:</strong> {order.deliveryAddress}
                                </div>
                                <div>
                                    <strong>Total Amount:</strong> {order.totalAmount} kr
                                </div>
                            </div>



                            <div className="mt-5 text-sm font-bold">
                                Products
                            </div>
                            <div className="flex-col border-2 rounded-md bg-white my-2 p-2 w-full text-xs">
                                {
                                    order.products.map(product => {
                                        return (
                                           <OrderProduct key={order.id+product.id} product={product} />
                                        )
                                    })
                                }
                            </div>


                        </div>
                    )
                })
            }
        </div>
    )
}

export default OrderList
