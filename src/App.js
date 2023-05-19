import './App.css';
import Categories from './components/categories/Categories';
import FavouriteFoods from './components/favouriteFoods/FavouriteFoods';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom'
import RecipeDetails from './components/recipeDetails/RecipeDetails';
import Home from './components/home/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipeDetails /> } />
      </Routes>
    </div>
  );
}

export default App;