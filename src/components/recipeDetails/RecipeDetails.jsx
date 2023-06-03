import React from "react";
import classes from "./recipeDetails.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [measures, setMeasures] = useState([]);
  const URL_DETAILS = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(`${URL_DETAILS}${id}`);
        const data = await res.json();
        setRecipe(data.meals[0]);
        setInstructions((prev) => {
          // if (prev.length === 0) return [data.meals[0][key]];
  
          return data.meals[0].strInstructions.split("\r\n");
        });
        Object.keys(data.meals[0]).forEach((key) => {
          if (key.includes("strIngredient") && data.meals[0][key] !== "") {
            setIngredients((prev) => {
              if (prev.length === 0) return [data.meals[0][key]];
              else return [...prev, data.meals[0][key]];
            });
          }

          if (key.includes("strMeasure") && data.meals[0][key] !== "") {
            setMeasures((prev) => {
              if (prev.length === 0) return [data.meals[0][key]];
              else return [...prev, data.meals[0][key]];
            });
          }
        
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Recipe Details</h2>
        <div className={classes.recipe}>
          <img src={recipe?.strMealThumb} />
          <div className={classes.metadata}>Title: {recipe?.strMeal}</div>
          <h3>Ingredients and measures</h3>
          <div className={classes.ingredients}>
            {ingredients?.map((ingredient, i) => (
              <div key={ingredient} className={classes.ingredient}>
                <span>{ingredient}</span>-<span>{measures[i]}</span>
              </div>
            ))}
          </div>
          <h3>Instructions</h3>
          <div className={classes.instructions}>
            {instructions?.map((instruction, i) => (
              <div key={instruction} className={classes.instruction}>
                <p>Step {i+1}</p>
                <span>{instruction}.</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
