import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import classes from "../categories/categories.module.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function MyRecipeCard({ recipe }) {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.recipe_id}`
      )
      .then((results) => {
        console.log(results);
        setMeal(results.data.meals[0]);
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
        //   onClick={() => handleSaveRecipe(recipe.idMeal)}
        variant="contained"
      >
        Delete Recipe
      </Button>
    </div>
  );
}

export default MyRecipeCard;
