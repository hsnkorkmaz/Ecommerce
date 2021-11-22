import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { adminApi, orderApi, productApi } from '../../api/ApiConfig';
import OrderCard from './OrderCard';
import OrderProductCard from './OrderProductCard';

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const getOrders = () => {
        axios.get(adminApi + "orders")
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        if (selectedOrder !== null) {
            axios.get(adminApi + "orderById",
                { params: { id: selectedOrder.id } })
                .then(res => {
                    setOrderDetails(res.data)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }, [selectedOrder])

    useEffect(() => {
        getOrders();
    }, [])

    const resetStates = () => {
        setSelectedOrder(null);
        setOrderDetails(null);
    }


    return (
        <div className="mt-10">
            <div className="flex flex-col md:flex-row md:justify-start">
                <div className="max-h-screen overflow-y-scroll">
                    <h1 className="text-2xl font-bold mb-3">Orders</h1>
                    <span className="bg-gradient-to-b from-green-200 to-green-100 rounded-lg p-1 mr-2">Delivered</span>
                    <span className="bg-gradient-to-b from-red-200 to-red-100 rounded-lg p-1">Not Delivered</span>
                    {
                        orders?.map(order => {
                            return (
                                <OrderCard key={order.id} order={order} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
                            )
                        })
                    }
                </div>
                <div className="ml-7">
                    <h1 className="text-2xl font-bold">{selectedOrder ? "Order Details" : "Select order to view details"}</h1>

                    {orderDetails ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                        resetStates();
                    }}>
                        Cancel
                    </button> : null}


                    {orderDetails?.isDelivered == false ? <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5"
                        onClick={() => {
                            axios.get(adminApi + "orderDeliver",
                                { params: { id: orderDetails.id } })
                                .then(res => {
                                    getOrders();
                                    resetStates();
                                })
                                .catch(err => {
                                    console.log(err)
                                });
                        }}>
                        Deliver Products</button>
                        :
                        null}
                    <div className="mt-5">
                        {orderDetails ? <div className="mb-4 font-medium">Ordered Products</div> : null}
                        <div className="flex flex-wrap items-start lg:justify-center justify-start">
                            {
                                orderDetails?.products?.map(product => {
                                    return (
                                        <OrderProductCard key={product.id} orderProduct={product} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminOrders
