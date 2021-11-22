import React, { useEffect, useState } from 'react'
import axios from 'axios'
import authApi from '../../api/ApiConfig'
import AdminCategories from './AdminCategories'
import AdminOrders from './AdminOrders'
import AdminProducts from './AdminProducts'
import AdminMain from './AdminMain'

const Admin = ({ logout }) => {

    const [selectedMenu, setSelectedMenu] = useState('')

    const selectedMenuClass = "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white cursor-pointer";
    const standartMenuClass = "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3 cursor-pointer";
    const disabledMenuClass = "inline-block py-1 px-3 text-gray-400 cursor-not-allowed";


    const renderPage = () => {
        switch (selectedMenu) {
            case 'Main':
                return <AdminMain />
            case 'Products':
                return <AdminProducts />
            case 'Orders':
                return <AdminOrders />
            case 'Categories':
                return <AdminCategories />
            default:
                setSelectedMenu('Main')
                return <AdminMain />
        }
    }

    return (
        <div>

            <div className="container mx-auto p-5">
                <div>
                    <button
                        className="text-white mr-2 bg-green-400 rounded-full cursor-pointer text-l leading-none px-3 py-1 border border-solid border-transparent bg-transparent block outline-none focus:outline-none"
                        onClick={() => logout()}>
                        Logout
                    </button>

                    <ul className="flex flex-col mt-3 md:flex-row">
                        <li className="mr-3">
                            <span className={selectedMenu == "Main" ? selectedMenuClass : standartMenuClass} onClick={() => setSelectedMenu("Main")}>Main</span>
                        </li>
                        <li className="mr-3">
                            <a className={selectedMenu == "Categories" ? selectedMenuClass : standartMenuClass}  onClick={() => setSelectedMenu("Categories")}>Categories</a>
                        </li>
                        <li className="mr-3">
                            <a className={selectedMenu == "Products" ? selectedMenuClass : standartMenuClass}  onClick={() => setSelectedMenu("Products")}>Products</a>
                        </li>
                        <li className="mr-3">
                            <a className={selectedMenu == "Orders" ? selectedMenuClass : standartMenuClass}  onClick={() => setSelectedMenu("Orders")}>Orders</a>
                        </li>
                    </ul>
                </div>
                <div className="m-1">
                    {renderPage()}
                </div>
            </div>





        </div>
    )
}

export default Admin