import React, { useEffect } from 'react'
import CategoryLink from './CategoryLink'
import { categoryApi } from '../../api/ApiConfig'
import axios from 'axios'

const CategoryList = (props) => {
    const [categories, setCategories] = React.useState(null);

    const getCategories = () => {
        axios.get(categoryApi + "categories")
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        getCategories();
    }, []);


    return (
        <div>
            <ul>
                {
                    categories && categories.map(category => {
                        return (
                            <li>
                                <CategoryLink key={category.id} category={category} subCategories={category.childCategories} getProducts={props.getProducts} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CategoryList
