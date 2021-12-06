import React, { useState, useEffect } from "react";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
import "./Cart.css";

const Cart = ({setShoppingSession}) => {
  const [checkout, setCheckout] = useState(false);

  const cartString = localStorage.getItem("Cart");
  const cartItems = JSON.parse(cartString);
  const [cart, setCart] = useState(cartItems);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => sum += item.price * item.quantity)
    setTotal(sum);
  })

  if (!cart[0]) {
    return (
      <div className="cartBox">
        <h3>You don't have anything added to cart!</h3>
      </div>
    );
  }

  return (
    <div className="cartBox">
      <div className="total">
        <h3>Total: ${total}</h3>
      </div>
      <div className="cartItems">
        {cartItems.map((item) => {
          return (
            <CartCard
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image_url={item.image_url}
              cart={cart}
              setCart={setCart}
            />
          );
        })}
      </div>
      <button 
        className="checkoutBtn" 
        onClick={(e) => {
          e.preventDefault()
          setCheckout(true);
        }}
      >
        Checkout
      </button>
      {checkout ? <Checkout /> : null}
    </div>
  );
};

export default Cart;
