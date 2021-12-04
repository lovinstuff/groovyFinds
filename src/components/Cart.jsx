import React, { useState, useEffect } from "react";
import {
  getCurrentSessionCartItems,
  updateItemQuantity,
  deleteCartItem,
} from "../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  async function getCartItems() {
    try {
      const cartItems = await getCurrentSessionCartItems();
      setCartItems(cartItems);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCartItems();
  });

  let totalPrice = 0;
  cartItems.forEach((item) => (totalPrice = totalPrice + item.price));

  if (cartItems === []) {
    return (
      <div className="cartBox">
        <h2>You have no items in cart yet!</h2>
      </div>
    );
  }

  return (
    <div className="cartBox">
      <div className="total">
        <h3>Total: {totalPrice}</h3>
      </div>
      <div className="cartItems">
        {cartItems.map((item) => {
          return (
            <div className="cartItem">
              <img
                className="cartItemImg"
                src={item.image_url}
                alt="cart item img"
              />
              <h3 className="cartItemName">{item.name}</h3>
              <h3 className="cartItemPrice">${item.price} each</h3>
              <h3 className="cartItemSubTotal">
                Subtotal: ${item.price * item.quantity}
              </h3>
              <div className="cartItemQuantityBox">
                <label for="quantity">Quantity:</label>
                <select
                  name="quantity"
                  className="cartItemQuantityDropdown"
                  onChange={(e) => {
                    try {
                        const newItem = await updateItemQuantity(item.id, e.target.value)
                    } catch(err){
                        console.log(err)
                    }
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
