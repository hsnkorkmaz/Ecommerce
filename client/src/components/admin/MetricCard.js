import React from 'react'

const MetricCard = ({ name, value }) => {
    return (
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                    <div className="flex flex-row items-center">
                        <div className="flex-1 text-right md:text-center">
                            <h5 className="font-bold uppercase text-gray-600">{name}</h5>
                            <h3 className="font-bold text-3xl">{value}<span className="text-green-500"></span></h3>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MetricCard
