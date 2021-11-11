import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserRegister from '../user/UserRegister';

const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [isUserNav, setUserNav] = useState(false)
    const [isShoppingNav, setShoppingNav] = useState(false)

    const mobileNavClass = "transform top-0 right-0 w-content bg-white fixed h-full overflow-auto transition-all ease-in-out duration-300 px-3 z-50 visible";


    return (
        <div className="sticky top-0 z-40">
            {/* SHOPPING CART */}
            <div className={`transform top-0 left-0 w-full fixed h-full bg-gray-800 opacity-50 z-50 ${!isShoppingNav ? "hidden" : ""}`} onClick={() => setShoppingNav(!isShoppingNav)}></div>
            <aside className={isShoppingNav ? mobileNavClass : "opacity-0 w-0 h-0"}>
                <div className="flex items-center">
                    <h1 className="w-full my-2 sm:text-xl md:text-2xl font-bold leading-tight text-center text-gray-800">
                        Shopping Cart
                    </h1>
                    {/*     <div className="mr-5 md:hidden"  onClick={() => setLeftOpen(!isShoppingNav)}>
                            X
                        </div> */}
                </div>

                <div className="w-full mb-4">
                    <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={{ background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)" }}></div>
                </div>
                <div className="md:mt-10">
                    <ul>
                        <li>
                            Product 1
                        </li>
                        <li>
                            Product 2
                        </li>
                    </ul>
                </div>
            </aside>


            <nav className="flex flex-wrap items-center justify-between px-2 py-3 z-40" style={{ background: "linear-gradient(90deg, #059669 0%, #f4f269 100%)" }}>
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <div className="flex">
                            <Link
                                className="text-base font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                                to="./"><span className="ml-2">Logo</span></Link>
                            {/* <input type="text"
                            placeholder="Search your product"
                            className="bg-white outline-none text-sm focus:outline-none rounded-3xl px-5 ml-4" /> */}

                        </div>
                        <div>

                        </div>
                        <div className="flex">
                            <Link
                                className="text-white mr-2 bg-green-400 rounded-full cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent bg-transparent block lg:hidden outline-none focus:outline-none"
                                to="/login">
                                <svg viewBox="0 0 512 512" enable-background="new 0 0 512 512" className="w-6 h-6 fill-current text-white">
                                    <path d="M454.426,392.582c-5.439-16.32-15.298-32.782-29.839-42.362c-27.979-18.572-60.578-28.479-92.099-39.085  c-7.604-2.664-15.33-5.568-22.279-9.7c-6.204-3.686-8.533-11.246-9.974-17.886c-0.636-3.512-1.026-7.116-1.228-10.661  c22.857-31.267,38.019-82.295,38.019-124.136c0-65.298-36.896-83.495-82.402-83.495c-45.515,0-82.403,18.17-82.403,83.468  c0,43.338,16.255,96.5,40.489,127.383c-0.221,2.438-0.511,4.876-0.95,7.303c-1.444,6.639-3.77,14.058-9.97,17.743  c-6.957,4.133-14.682,6.756-22.287,9.42c-31.521,10.605-64.119,19.957-92.091,38.529c-14.549,9.58-24.403,27.159-29.838,43.479  c-5.597,16.938-7.886,37.917-7.541,54.917h205.958h205.974C462.313,430.5,460.019,409.521,454.426,392.582z" />
                                </svg>
                            </Link>
                            <button
                                className="text-white bg-green-400 rounded-full cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent bg-transparent block lg:hidden outline-none focus:outline-none"
                                type="button"
                                onClick={() => setShoppingNav(!isShoppingNav)}>
                                <svg viewBox="3.999999761581421 3.0000805854797363 24.003000259399414 21.999919891357422" className="h-5 w-5 fill-current">
                                    <path d="M19.933 22.003h.5a.254.254 0 00.25-.222l1.318-7.496A.252.252 0 0021.75 14h-.5a.253.253 0 00-.251.22l-1.317 7.498a.253.253 0 00.25.285m-4.423-7.75v7.496c0 .14.113.254.253.254h.494a.254.254 0 00.253-.254v-7.496a.253.253 0 00-.253-.253h-.494a.253.253 0 00-.253.253M10.756 14h-.5a.254.254 0 00-.251.285l1.346 7.497a.253.253 0 00.25.22h.497c.152 0 .27-.133.25-.284l-1.341-7.497a.253.253 0 00-.251-.221m12.786 9H8.465l-1.29-11h17.656l-1.289 11zm4.201-13H17.297l-5.63-6.904a.263.263 0 00-.369-.037l-1.144.933a.26.26 0 00-.037.368L14.716 10H4.257a.254.254 0 00-.254.254v.993c0 .002-.003.003-.003.006v.494c0 .14.114.253.253.253H5l1.712 12.782a.257.257 0 00.254.218h18.075a.257.257 0 00.253-.218L27.007 12h.736a.26.26 0 00.26-.26v-1.48a.26.26 0 00-.26-.26z">
                                    </path>
                                </svg>
                            </button>
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
                            <li>
                                <Link
                                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">Main Page</span></Link>
                            </li>
                            <li>
                                <Link
                                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/about" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">About</span></Link>
                            </li>
                            <li>
                                <Link
                                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/products" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">Products</span></Link>
                            </li>
                            <li>
                                <Link
                                    className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/contact" onClick={() => setNavbarOpen(!navbarOpen)}><span className="ml-2">Contact</span></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden lg:block">
                        <Link to="/login" className="flex items-center justify-center text-white bg-green-600 rounded-full cursor-pointer px-3 py-2 lg:static mr-3">
                           
                                <svg viewBox="0 0 512 512" enable-background="new 0 0 512 512" className="w-6 h-6 fill-current text-white">
                                    <path d="M454.426,392.582c-5.439-16.32-15.298-32.782-29.839-42.362c-27.979-18.572-60.578-28.479-92.099-39.085  c-7.604-2.664-15.33-5.568-22.279-9.7c-6.204-3.686-8.533-11.246-9.974-17.886c-0.636-3.512-1.026-7.116-1.228-10.661  c22.857-31.267,38.019-82.295,38.019-124.136c0-65.298-36.896-83.495-82.402-83.495c-45.515,0-82.403,18.17-82.403,83.468  c0,43.338,16.255,96.5,40.489,127.383c-0.221,2.438-0.511,4.876-0.95,7.303c-1.444,6.639-3.77,14.058-9.97,17.743  c-6.957,4.133-14.682,6.756-22.287,9.42c-31.521,10.605-64.119,19.957-92.091,38.529c-14.549,9.58-24.403,27.159-29.838,43.479  c-5.597,16.938-7.886,37.917-7.541,54.917h205.958h205.974C462.313,430.5,460.019,409.521,454.426,392.582z" />
                                </svg>
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <div onClick={() => setShoppingNav(!isShoppingNav)} className="flex items-center justify-center text-white bg-green-600 rounded-full cursor-pointer px-3 py-2 lg:static">
                            <button
                                type="button">
                                <svg viewBox="3.999999761581421 3.0000805854797363 24.003000259399414 21.999919891357422" className="h-5 w-5 fill-current">
                                    <path d="M19.933 22.003h.5a.254.254 0 00.25-.222l1.318-7.496A.252.252 0 0021.75 14h-.5a.253.253 0 00-.251.22l-1.317 7.498a.253.253 0 00.25.285m-4.423-7.75v7.496c0 .14.113.254.253.254h.494a.254.254 0 00.253-.254v-7.496a.253.253 0 00-.253-.253h-.494a.253.253 0 00-.253.253M10.756 14h-.5a.254.254 0 00-.251.285l1.346 7.497a.253.253 0 00.25.22h.497c.152 0 .27-.133.25-.284l-1.341-7.497a.253.253 0 00-.251-.221m12.786 9H8.465l-1.29-11h17.656l-1.289 11zm4.201-13H17.297l-5.63-6.904a.263.263 0 00-.369-.037l-1.144.933a.26.26 0 00-.037.368L14.716 10H4.257a.254.254 0 00-.254.254v.993c0 .002-.003.003-.003.006v.494c0 .14.114.253.253.253H5l1.712 12.782a.257.257 0 00.254.218h18.075a.257.257 0 00.253-.218L27.007 12h.736a.26.26 0 00.26-.26v-1.48a.26.26 0 00-.26-.26z">
                                    </path>
                                </svg>
                            </button>
                            <span className="text-sm font-medium ml-2">425,25 kr</span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
