import React, { useState, useEffect } from "react";
import {
  updateItemQuantity,
  deleteCartItem,
} from "../../api"

const CartCard = ({
  id,
  name,
  quantity,
  price,
  image_url,
  cart,
  setCart
}) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const deleteItem = async () => {
    const cartString = localStorage.getItem("Cart");
    const cartItems = JSON.parse(cartString);
    const deletedItem = cartItems.find((item) => item.id === id)
    const index = cartItems.indexOf(deletedItem)
    cartItems.splice(index, 1)
    localStorage.removeItem("Cart");
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    setCart(cartItems);
    try {
      await deleteCartItem(id)
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div className="cartItem">
      <img className="cartItemImg" src={image_url} alt="cart item image" />
      <h3 className='cartItemName'>{name}</h3>
      <h3 className='cartItemPrice'>${price} each</h3>
      <h3 className='cartItemSubtotal'>Subtotal: ${parseInt(price) * newQuantity}</h3>
      <div className="cartItemQuantity">
        <label for="cartItemQuantity">Quantity: </label>
        <select 
          className='cartItemQuantityList'
          name="cartItemQuantity"
          id="cars"
          value={newQuantity}
          onChange={async (e) => {
            setNewQuantity(e.target.value)
            const cartString = localStorage.getItem("Cart")
            const cartItems = JSON.parse(cartString)
            const itemToUpdate = cartItems.find((item) => item.id === id)
            const index = cartItems.indexOf(itemToUpdate)
            cartItems[index].quantity = parseInt(e.target.value);
            localStorage.removeItem("Cart");
            localStorage.setItem("Cart", JSON.stringify(cartItems))
            setCart(cartItems);
            try {
              await updateItemQuantity(id, parseInt(e.target.value))
            } catch (err) {
              console.log(err);
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
      <button 
        className="cartItemDeleteBtn" 
        onClick={deleteItem}
      >Delete</button>
    </div>
  );
};

export default CartCard;
