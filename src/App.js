import './App.css';
import Categories from './components/categories/Categories';
import FavouriteFoods from './components/favouriteFoods/FavouriteFoods';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom'
import RecipeDetails from './components/recipeDetails/RecipeDetails';
import Home from './components/home/Home';
import Login from './components/login/Login'
import { useState, useEffect } from 'react';
import cookie from "cookie"
import SavedRecipes from './components/savedRecipes/SavedRecipes';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const cookies = cookie.parse(document.cookie)
    if (cookies.token) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <div>
      <Navbar state={{loggedIn, setLoggedIn}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipeDetails /> } />
        <Route path='/login'  element={<Login state={{loggedIn, setLoggedIn}}/> } />
        <Route path='/my-recipes'  element={<SavedRecipes state={{loggedIn, setLoggedIn}}/> } />
      </Routes>
    </div>
  );
}

export default App;