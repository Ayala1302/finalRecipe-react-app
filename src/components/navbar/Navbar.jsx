import React from "react";
import classes from "./navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cookie from "cookie";

const Navbar = ({ state }) => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = state;
  console.log(state, "state in navbar");

  const handleLogout = () => {
    document.cookie = cookie.serialize("token", null, { maxAge: 0 });

    setLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to="/" className={classes.left}>
          Home Chef
        </Link>
        <ul className={classes.center}>
          <Button
            sx={{ color: "orange" }}
            component={Link}
            to="/"
            className={classes.listItem}
          >
            Home
          </Button>
          {loggedIn ? (
            <Button
              onClick={handleLogout}
              sx={{ color: "orange" }}
              variant="text"
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{ color: "orange" }}
              variant="text"
            >
              Login
            </Button>
          )}
          {loggedIn && (
            <Button
            component={Link}
            to="/my-recipes"
            sx={{ color: "orange" }}
            variant="text"
          >
            My Recipes
          </Button>
          )}
        </ul>
        {/* <div className={classes.right}>
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
