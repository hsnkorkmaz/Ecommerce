import React from 'react'

const CategoryOption = ({id, name, indent}) => {
    return (
            <option value={id}>{indent}{name}</option>
    )
}

export default CategoryOption
