import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="NavBar">
      <Link to="/" className="link">
        All Products
      </Link>
      <Link to="login" className="link">
        Login
      </Link>
      <Link to="signUp" className="link">
        Sign Up
      </Link>
      <Link to="cart" className="link">
        Cart
      </Link>
    </div>
  );
};

export default NavBar;
