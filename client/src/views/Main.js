import React from 'react'
import Footer from '../components/footer/Footer'
import Landing from '../components/header/Landing'
import ProductList from '../components/product/ProductList'

const Main = () => {
    return (
        <div>
            <Landing />
            <section className="bg-white py-8">
                <ProductList />
            </section>
            <Footer />
        </div>
    )
}

export default Main
