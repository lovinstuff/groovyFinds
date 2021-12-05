import React, { useState, useEffect } from "react";
import { getProducts } from "../../api";
import "./Product.css";
import ProductCard from "./ProductCard";

const Products = ({ cart, setCart }) => {
  const [grabbedProducts, setGrabbedProducts] = useState();

  const getAllProducts = async () => {
    try {
      const products = await getProducts();

      setGrabbedProducts(products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1 className="Title">Feel the groove:</h1>
      <div className="productCards">
        {grabbedProducts?.map((product, index) => {
          return (
            <ProductCard
              key={product.id}
              index={index}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;