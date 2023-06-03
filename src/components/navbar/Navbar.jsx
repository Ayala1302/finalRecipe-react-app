import React from "react";
import classes from "./navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to="/" className={classes.left}>
          Home Chef
        </Link>
        <ul className={classes.center}>
          <Link to="/" className={classes.listItem}>
            Home
          </Link>
          <Link to="/" className={classes.listItem}>
            Logout
          </Link>
        </ul>
        <div className={classes.right}>
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
