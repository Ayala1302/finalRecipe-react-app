import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "cookie";
import { useNavigate } from "react-router-dom";
import MyRecipeCard from "../myRecipeCard/MyRecipeCard";
import classes from "../categories/categories.module.css";

function SavedRecipes({ state }) {
  const { loggedIn, setLoggedIn } = state;
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
      });
  }, []);

  useEffect(() => {
    console.log(myRecipes);
  }, [myRecipes]);

  if (myRecipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.recipes}>
      {myRecipes.map((recipe) => (
        <MyRecipeCard recipe={recipe} />
      ))}
    </div>
  );
}

export default SavedRecipes;
