const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
} = require("../../db");

//Gets all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;