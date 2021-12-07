import React, { useState, useEffect } from "react";
import { getToken } from "../../auth";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
import "./Cart.css";

const Cart = ({ setShoppingSession }) => {
  const [checkout, setCheckout] = useState(false);

  const cartString = localStorage.getItem("Cart");
  console.log(cartString, "STRING!!!");
  const cartItems = JSON.parse(cartString);
  const [cart, setCart] = useState(cartItems);
  const [total, setTotal] = useState(0);
  const token = getToken();

  useEffect(() => {
    let sum = 0;
    if (!cart) {
      sum = 0;
    } else {
      cart.forEach((item) => sum += item.price * item.quantity)
    }
    setTotal(sum);
  })

  if (!cart || !cart[0]) {
    return (
      <div className="cartBox">
        <h3>You don't have anything added to cart!</h3>
      </div>
    );
  }


  return (
    <div>
      {cart && cart.length ? (
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
              e.preventDefault();
              if (token) setCheckout(true);
              else alert("You must be logged in to checkout!");
            }}
          >
            Checkout
          </button>
          {checkout ? <Checkout /> : null}
        </div>
      ) : (
        <div className="cartBox">
          <h3>You don't have anything added to cart!</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
