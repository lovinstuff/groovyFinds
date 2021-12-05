import React, { useState, useEffect } from "react";
import {
  getCurrentSessionCartItems,
  updateItemQuantity,
  deleteCartItem,
} from "../api";
import CartCard from "./CartCard";
import Checkout from "./Checkout";

const Cart = () => {
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const cartString = localStorage.getItem('Cart')
  //   setCart(JSON.parse(cartString))
  // })
  const [checkout, setCheckout] = useState(false);

  const cartString = localStorage.getItem("Cart");
  const cart = JSON.parse(cartString);

  let sum = 0;
  cart.forEach((item) => sum += item.price * item.quantity)

  const [total, setTotal] = useState(sum);
  if (cart === []) {
    return (
      <div className="cartBox">
        <h3>You don't have anything added to cart!</h3>
      </div>
    );
  }

  return (
    <div className="cartBox">
      <div className="total">
        <h3>Total: {total}</h3>
      </div>
      <div className="cartItems">
        {cart.map((item) => {
          return (
            <CartCard
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image_url={item.image_url}
              total={total}
              setTotal={setTotal}
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
