import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { authApi } from '../../api/ApiConfig'
import UserContext from '../../context/UserContext'
import { Navigate } from 'react-router-dom'

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

            <button
                className="text-white mr-2 bg-green-400 rounded-full cursor-pointer text-l leading-none px-3 py-1 border border-solid border-transparent bg-transparent block lg:hidden outline-none focus:outline-none"
                onClick={() => logout()}>
                Logout
            </button>




            <h1>User Profile</h1>
            <h3>Name: {currentUser?.name}</h3>
            <h3>Email: {currentUser?.email}</h3>
            <h3>Orders etc</h3>
        </div>
    )
}

export default UserProfile
