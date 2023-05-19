import React from 'react'
import classes from './navbar.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <Link to='/' className={classes.left}>
               ChefsHouse
            </Link>
            <ul className={classes.center}>
               <Link to='/' className={classes.listItem}>
                  Home
               </Link>
               <li className={classes.listItem}>
                  About
               </li>
               <li className={classes.listItem}>
                  Contacts
               </li>
               <li className={classes.listItem}>
                  Services
               </li>
            </ul>
            <div className={classes.right}>
               <input type="text" placeholder='Search...' />
               <AiOutlineSearch />
            </div>
         </div>
      </div>
   )
}

export default Navbar