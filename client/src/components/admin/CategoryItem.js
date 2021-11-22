import React from 'react'

const CategoryItem = ({id, name, indent, selectedCategory, setSelectedCategory}) => {
    return (
        <div>
            <button 
            className={`text-left p-1 px-2 rounded text-white hover:bg-green-dark focus:outline-none my-1 ${selectedCategory == id ? "bg-green-500" : "bg-indigo-500"}`}
            id={id}
            onClick={(e) => {setSelectedCategory(e.target.id)
            }}>
                {indent}{name}
            </button>
        </div>
    )
}

export default CategoryItem
