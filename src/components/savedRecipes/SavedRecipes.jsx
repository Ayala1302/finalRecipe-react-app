import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "cookie";
import { useNavigate } from "react-router-dom";
import MyRecipeCard from "../myRecipeCard/MyRecipeCard";
import classes from "../categories/categories.module.css";

function SavedRecipes({ state }) {
  const { loggedIn, setLoggedIn } = state;
  const [loaded, setLoaded] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    if (!cookies.token) {
      setLoggedIn(false);
      navigate("/login");
    }
    axios
      .get("https://home-chef-server.vercel.app/user-recipes", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((results) => {
        console.log(results, "*");
        setMyRecipes(results.data.rows);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    console.log(myRecipes, "effect my recipes");
  }, [myRecipes]);

  if (myRecipes.length === 0 && loaded) {
    return <h3 style={{ textAlign: "center", marginTop: 40 }}>Oops... No saved Recipes</h3>;
  }

  if (myRecipes.length === 0) {
    return <h3 style={{ textAlign: "center", marginTop: 40 }}>Loading...</h3>;
  }

  return (
    <div className={classes.recipes}>
      {myRecipes.map((recipe, i) => (
        <MyRecipeCard
          recipe={recipe}
          setMyRecipes={setMyRecipes}
          myRecipes={myRecipes}
          index={i}
        />
      ))}
    </div>
  );
}

export default SavedRecipes;
