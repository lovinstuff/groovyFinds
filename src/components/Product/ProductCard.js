import React from "react";
import { addItemToCart } from "../../api";

const ProductCard = ({ index, product, cart, setCart }) => {
  const { name, description, price, image_url, in_stock } = product;
  const token = localStorage.getItem("token");
  const handleAddtoCart = async () => {
    if (token) {
     await addItemToCart(product.id, 1, token);
    }
    const existingProductInCart = cart.find((element) => element.name === name);
    if (existingProductInCart) {
      existingProductInCart.quantity += 1;
      cart.splice(index, 1, existingProductInCart);
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  };

  return (
    <div className="product">
      <img
        className="productImg"
        src={image_url}
        alt="Some groovy record"
      ></img>
      <h1 className="name">{name}</h1>
      <p className="description">Description: {description}</p>
      <h3 className="price">Price: ${price}</h3>
      <button
       
        onClick={() => {
          in_stock ? handleAddtoCart() : alert("Item out of stock!");
        }}
      > Add to cart! </button>
      {in_stock ? (
        <p className="StockStatus">In stock!</p>
      ) : (
        <p className="StockStatus" style={{ color: "red" }}>
          Out of stock!
        </p>
      )}
    </div>
  );
};
export default ProductCard;