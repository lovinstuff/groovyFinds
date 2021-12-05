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
  return (
    <div className="cartItem">
      <img className="cartItemImg" src={image_url} alt="cart item image" />
      <h2>{name}</h2>
      <h2>${price} each</h2>
      <h2>Subtotal: ${parseInt(price) * newQuantity}</h2>
      <label for="cartItemQuantity">Quantity: </label>
      <select
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
  );
};

export default CartCard;
