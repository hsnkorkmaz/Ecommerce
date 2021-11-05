import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3" style={{ background: "linear-gradient(90deg, #059669 0%, #f4f269 100%)" }}>
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <div className="flex">
                        <Link
                            className="text-base font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            to="/"><span className="ml-2">Logo</span></Link>
                        <input type="text"
                            placeholder="Search your product"
                            className="bg-white outline-none text-sm focus:outline-none rounded-3xl px-5 ml-4" />

                    </div>
                    <div className="flex">
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img" focusable="false">
                                <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}>
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        <li className="nav-item">
                            <Link
                                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">Main Page</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/about" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">About</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/products" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">Products</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/contact" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">Contact</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
