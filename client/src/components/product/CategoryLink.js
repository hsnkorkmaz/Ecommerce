import React, { useState } from 'react'

const CategoryLink = (props) => {

    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <div onClick={() => setIsActive(!isActive)} className="flex items-center justify-between cursor-pointer mx-auto lg:mx-0 bg-white text-gray-800 font-normal rounded-full my-2 py-2 px-8 shadow-sm focus:outline-none focus:shadow-outline transform transition hover:text-green-700 hover:bg-green-50 duration-300 ease-in-out">
                <span>{props.category}</span>
                <span>
                    <svg viewBox="9.498448371887207 4.000859260559082 15.001301765441895 23.999279022216797" style={{ height: "12px", width: "12px" }}>
                        <path d="M24.145 15.236L10.88 4.06a.25.25 0 00-.352.029l-.97 1.146a.248.248 0 00.03.352L21.952 16 9.589 26.414a.248.248 0 00-.03.352l.97 1.146a.25.25 0 00.352.029l13.264-11.176c.473-.4.473-1.13 0-1.53"></path>
                    </svg>
                </span>
            </div>
            <div className={isActive ? "" : "hidden"}>
                <ul className="ml-8">
                    {props.subCategories?.map(subCategory => {
                        return (
                            <li key={subCategory.name}>
                                <div className="cursor-pointer mx-auto lg:mx-0 bg-white text-gray-800 font-normal rounded-full my-2 py-2 px-8 shadow-sm focus:outline-none focus:shadow-outline transform transition hover:text-green-700 hover:bg-green-50 duration-300 ease-in-out">
                                    {subCategory.name}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default CategoryLink
