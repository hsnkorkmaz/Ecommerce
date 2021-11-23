import React from 'react'

const ProductCategoryButton = ({id, name, productCategories, setProductCategories}) => {
    return (
        <button type="button" 
        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        onClick={() =>
          {
            if (productCategories.length == 1) {
              alert('You need to have at least 1 category');
              return;
           }
           setProductCategories(productCategories.filter(productCategory => productCategory.id !== id))}
          }
         >
        <span className="sr-only">Close menu</span>{name}
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )
}

export default ProductCategoryButton
