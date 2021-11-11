import React from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../../api/ApiConfig'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const UserRegister = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirm, setPasswordConfirm] = React.useState('')
    const [error, setError] = React.useState('')
    const [navigate, setNavigate] = React.useState(false)

    const submitRegisterForm = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        axios.post(authApi + 'register', {
            "email": email,
            "password": password
        })
            .then(function (response) {
                setNavigate(true);
            })
            .catch(err => {
                console.log(err);
            });
    }
    

    if (navigate) {
        return <Navigate to='/login' />
    }


    return (
        <div>
            <div className="px-6 pb-3 rounded shadow-md text-black flex flex-col m-auto w-full md:w-1/2 lg:w-1/3">
                <form onSubmit={submitRegisterForm}>
                    <h1 className="mb-8 text-3xl text-center">Register</h1>
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
                    <input
                        type="password"
                        className="block border border-grey-light p-3 rounded mb-4 w-full"
                        name="confirm_password"
                        placeholder="Confirm Password" required minLength="6" maxLength="15" onChange={e => setPasswordConfirm(e.target.value)} />
                    <span className="text-red-500">{error}</span>
                    <button
                        type="submit"
                        className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1 w-full"
                    >Create Account</button>
                </form>
            </div>
            <div className="text-grey-dark mt-6">
                Already have an account?<br />
                <Link className="no-underline border-b border-blue text-blue" to="/login">
                    Log in
                </Link>
            </div>
        </div>
    )
}

export default UserRegister
