import React from 'react'

const CategoryItem = ({id, name, indent, setSelectedCategory}) => {
    return (
        <div>
            <button className="text-left p-1 px-2 rounded bg-indigo-500 text-white hover:bg-green-dark focus:outline-none my-1" id={id}
            onClick={(e) => {setSelectedCategory(e.target.id)
            }}>
                {indent}{name}
            </button>
        </div>
    )
}

export default CategoryItem
