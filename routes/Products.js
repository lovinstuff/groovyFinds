const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
} = require("../db");

//Gets all products
productsRouter.get("/", async (req, res, next) => {
  try {
    console.log('in productsRouter')
    const allProducts = await getAllProducts();
    console.log("!!!!!!!!!!",allProducts)
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;