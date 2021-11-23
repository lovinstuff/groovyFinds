import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="NavBar">
      <Link to="/">All Products</Link>
      <Link to="login">Login</Link>
      <Link to="signUp">Sign Up</Link>
      <Link to="cart">Cart</Link>
    </div>
  );
};

export default NavBar;
