import React from 'react'

const OrderCard = ({ order, selectedOrder, setSelectedOrder }) => {

    const formatDate = (date) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString([], options);
    }

    const handleClick = () => {
        setSelectedOrder(order);
    }

    return (
        <div className="w-full py-3 pr-3 cursor-pointer">
            {
                order?.isDelivered === false ?
                    <div
                    className={selectedOrder?.id === order.id ? "bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-t-4 border-gray-900 rounded-lg shadow-xl p-5" : "bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-600 rounded-lg shadow-lg p-5"}
                    onClick={handleClick}>
                        <div className="flex flex-row items-center">
                            <div className="flex-1 text-left">
                                <h5 className="font-bold text-gray-600">Order Id: <span className="text-red-500">{order.id}</span></h5>
                                <h5 className="font-bold text-gray-600">Order Date: <span className="text-red-500">{formatDate(order.orderDate)}</span></h5>
                                <h5 className="font-bold text-gray-600">Total Amount: <span className="text-red-500">{order.totalAmount} kr</span></h5>
                                <h5 className="font-bold text-gray-600">Delivery Address:</h5>
                                <h5 className="font-bold text-gray-600"><span className="text-red-500">{order.deliveryAddress}</span></h5>
                            </div>
                        </div>
                    </div>
                    :
                    <div 
                    className={selectedOrder?.id === order.id ? "bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-t-4 border-gray-900 rounded-lg shadow-xl p-5" : "bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-lg p-5"}
                    onClick={handleClick}>
                        <div className="flex flex-row items-center">
                            <div className="flex-1 text-left">
                                <h5 className="font-bold text-gray-600">Order Id: <span className="text-green-500">{order.id}</span></h5>
                                <h5 className="font-bold text-gray-600">Order Date: <span className="text-green-500">{formatDate(order.orderDate)}</span></h5>
                                <h5 className="font-bold text-gray-600">Total Amount: <span className="text-green-500">{order.totalAmount} kr</span></h5>
                                <h5 className="font-bold text-gray-600">Delivery Address:</h5>
                                <h5 className="font-bold text-gray-600"><span className="text-green-500">{order.deliveryAddress}</span></h5>
                            </div>
                        </div>
                    </div>
            }


        </div>
    )
}

export default OrderCard
