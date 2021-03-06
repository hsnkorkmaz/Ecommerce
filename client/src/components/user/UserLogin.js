import React, { useContext, useEffect } from 'react'
import { authApi } from '../../api/ApiConfig'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const UserLogin = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [navigate, setNavigate] = React.useState(false)
    const [error, setError] = React.useState('')

    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        if (user !== null) {
            setNavigate(true);
        }
    }, []);

    const submitLoginForm = (e) => {
        e.preventDefault();
        axios.post(authApi + 'login', {
            "email": email,
            "password": password
        }, { withCredentials: true })
            .then(function (response) {
                axios.get(authApi + 'user',
                    { withCredentials: true })
                    .then(function (response) {
                        setUser(response.data.name);
                        setNavigate(true);
                    })
                    .catch(err => {
                        setError(err.response.data.message)
                    });
            })
            .catch(err => {
                setError(err.response.data.message)
            });
    }

    if (navigate) {
        return <Navigate to='/profile' />
    }



    return (
        <div>
            <div className="px-6 pb-3 rounded shadow-md text-black flex flex-col m-auto w-full md:w-1/2 lg:w-1/3">
                <form onSubmit={submitLoginForm}>
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <input
                        type="email"
                        className="block border border-grey-light p-3 rounded mb-4 w-full"
                        name="email"
                        placeholder="Email" required onChange={e => setEmail(e.target.value)} />

                    <input
                        type="password"
                        className="block border border-grey-light p-3 rounded mb-4 w-full"
                        name="password"
                        placeholder="Password" required minLength="6" maxLength="15" onChange={e => setPassword(e.target.value)} />
                    <span className="text-red-500">{error}</span>
                    <button
                        type="submit"
                        className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full"
                    >Login</button>
                </form>

            </div>
            <div className="text-grey-dark mt-6">
                Don't you have an account?<br />
                <Link className="no-underline border-b border-blue text-blue" to="/register">
                    Create Account
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
