import React, { useEffect, useContext, useState } from 'react'
import Admin from '../components/admin/Admin'
import UserProfile from '../components/user/UserProfile'
import axios from 'axios'
import { authApi } from '../api/ApiConfig'
import UserContext from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [navigate, setNavigate] = useState(false)
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

                    if (response.data.role === 'admin') {
                        setIsAdmin(true);
                    }

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

    const renderProfile = () => {
        if (isAdmin) {
            return <Admin isAdmin={isAdmin} logout={logout} />
        } else {
            return (<UserProfile
                isAdmin={isAdmin}
                user={user}
                setUser={setUser}
                navigate={navigate}
                setNavigate={setNavigate}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                logout= {logout} />)

        }
    }

    return (
        <div>
            {renderProfile()}
        </div>
    )
}

export default Profile
