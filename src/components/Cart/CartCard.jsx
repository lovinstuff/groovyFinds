import React, { useState, useEffect } from "react";

const CartCard = ({
  id,
  name,
  quantity,
  price,
  image_url,
  total,
  setTotal,
}) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const deleteItem = () => {
    const cartString = localStorage.getItem("Cart");
    const cart = JSON.parse(cartString);
    const deletedItem = cart.find((item) => item.id === id)
    const index = cart.indexOf(deletedItem)
    cart.splice(index, 1)
    localStorage.removeItem("Cart");
    localStorage.setItem("Cart", JSON.stringify(cart));
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
          onChange={(e) => {
            setNewQuantity(e.target.value);
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
