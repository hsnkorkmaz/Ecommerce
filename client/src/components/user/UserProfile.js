import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { authApi } from '../../api/ApiConfig'
import UserContext from '../../context/UserContext'
import { Navigate } from 'react-router-dom'
import OrderList from '../orders/OrderList'

const UserProfile = () => {
    const [navigate, setNavigate] = React.useState(false)
    const [currentUser, setCurrentUser] = useState();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user === null) {
            setNavigate(true);
        } else {
            axios.get(authApi + 'user',
                { withCredentials: true })
                .then(function (response) {
                    setCurrentUser(response.data);
                })
                .catch(err => {
                    setNavigate(true);
                });
        }
    }, []);


    const logout = () => {
        axios.get(authApi + 'logout',
            { withCredentials: true })
            .then(function (response) {
                setUser(null);
                setNavigate(true);
            })
            .catch(err => {
                setNavigate(true);
            });
    }

    if (navigate) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <div className="container mx-auto flex flex-col md:flex-row">
                <aside className="min-w-min mr-4 mt-3">
                    <div className="flex items-center">
                        <h1 className="w-full my-2 sm:text-xl md:text-4xl font-bold leading-tight text-center text-gray-800">
                            Profile
                        </h1>
                    </div>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                    </div>
                    <div className="md:mt-5 ml-14 md:ml-0">
                        <ul>
                            <li>
                                <button
                                    className="text-white mr-2 bg-green-400 rounded-full cursor-pointer text-l leading-none px-3 py-1 border border-solid border-transparent bg-transparent block outline-none focus:outline-none"
                                    onClick={() => logout()}>
                                    Logout
                                </button>
                            </li>
                            <li>Hi, <strong>{currentUser?.name} {currentUser?.surname}</strong></li>
                            <li>{currentUser?.email}</li>

                        </ul>
                    </div>
                </aside>
                <div className="w-full mr-4 mt-3">
                    <h1 className="w-full my-2  sm:text-xl md:text-4xl font-bold leading-tight text-center text-gray-800">
                        Orders
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                    </div>
                    <div className="md:mt-5 ml-14 mr-14 md:ml-0">
                       <OrderList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
