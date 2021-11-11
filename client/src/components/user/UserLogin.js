import React from 'react'

import { Link } from 'react-router-dom'

const UserLogin = () => {
    return (
        <div>
        <div className="px-6 pb-3 rounded shadow-md text-black flex flex-col m-auto w-full md:w-1/2 lg:w-1/3">
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <input
                type="text"
                className="block border border-grey-light p-3 rounded mb-4"
                name="email"
                placeholder="Email" />

            <input
                type="password"
                className="block border border-grey-light p-3 rounded mb-4"
                name="password"
                placeholder="Password" />
            <button
                type="submit"
                className="text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >Login</button>
        </div>
        <div className="text-grey-dark mt-6">
            Don't you have an account?<br/>
            <Link className="no-underline border-b border-blue text-blue" to="/register">
                Create Account
            </Link>
        </div>
    </div>
    )
}

export default UserLogin
