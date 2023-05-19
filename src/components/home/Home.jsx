import React from 'react'
import Categories from '../categories/Categories'
import FavouriteFoods from '../favouriteFoods/FavouriteFoods'
import Hero from '../hero/Hero'
import classes from './home.module.css'

const Home = () => {
    return (
        <div>
            <Hero />
            <FavouriteFoods />
            <Categories />
        </div>
    )
}

export default Home