import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import classes from "../categories/categories.module.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import cookie from "cookie";

function MyRecipeCard({ recipe, setMyRecipes, index, myRecipes }) {
  const [meal, setMeal] = useState(null);

  const deleteRecipe = (id) => {
    const cookies = cookie.parse(document.cookie);
    axios
      .delete(`https://home-chef-server.vercel.app/delete-recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((results) => {
        // console.log(myRecipes);
        // const newList = [...myRecipes].filter((recipe) => recipe.id !== id);
        // console.log(newList, "newlist");

        // setMyRecipes(newList);
        console.log(results);
        window.location.reload();
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.recipe_id}`
      )
      .then((results) => {
        console.log(results);
        setMeal({ ...results.data.meals[0], user_recipe_id: recipe.id });
      });
  }, []);

  useEffect(() => {
    console.log(meal, "single meal");
  }, [meal]);

  if (!meal) return <div>loading...</div>;

  return (
    <div key={meal.idMeal} className={classes.recipe}>
      <Link to={`/recipe/${meal.idMeal}`} className={classes.imgContainer}>
        <img src={meal.strMealThumb} />
      </Link>
      <h3>{meal.strMeal}</h3>
      <Button
        onClick={() => deleteRecipe(meal.user_recipe_id)}
        variant="contained"
      >
        Delete Recipe
      </Button>
    </div>
  );
}

export default MyRecipeCard;
