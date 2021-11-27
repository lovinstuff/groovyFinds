import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
<<<<<<< HEAD
    return (
        <div className="NavBar">
            <Link to='/' className="link">All Products</Link>
            <Link to='login' className="link">Login</Link>
            <Link to='signUp' className="link">Sign Up</Link>
            <Link to='cart' className="link">Cart</Link>
        </div>
    )
}
=======
  return (
    <div className="NavBar">
      <Link to="/">All Products</Link>
      <Link to="login">Login</Link>
      <Link to="signUp">Sign Up</Link>
      <Link to="cart">Cart</Link>
    </div>
  );
};
>>>>>>> 5030be7b653c35fc00d170a7d8a2a2f1b752828c

export default NavBar;
