const express = require("express");
const cartRouter = express.Router();
const {
  addToCart,
  changeItemQuantity,
  deleteCartItem,
  getCartItemsByUser,
  createShoppingSession,
  updateShoppingSessionToFalse,
} = require("../db");

//const {
// getSessionId
//} = require('../auth');

cartRouter.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const cartItems = await getCartItemsByUser(userId);

    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

cartRouter.post('/newsession', async (req, res, next) => {
  try {
    const newSession = await createShoppingSession(req.body.userId ? req.body.userId : null)
    res.send({newSession})
  } catch (err) {
    next(err);
  }
})

cartRouter.post('/:shoppingSessionID', async (req, res, next) => {
  const shoppingSessionID = req.params.shoppingSessionID;
  try {
    const updatedSession = await updateShoppingSessionToFalse(shoppingSessionID)
    res.send(updatedSession)
  } catch(err) {
    next(err);
  }
})

cartRouter.patch("/", async (req, res, next) => {
  const { sessionId, albumId, price, image_url, quantity } = req.body;

  try {
    const newCartItem = await addToCart(sessionId, albumId, price, quantity);

    res.send(newCartItem);
  } catch (err) {
    next(err);
  }
});

cartRouter.post("/:cartItemID", async (req, res, next) => {
  const { quantity } = req.body;
  const cartItemID = req.params.cartItemID;

  try {
    const updatedCartItem = await changeItemQuantity(cartItemID, quantity);

    res.send(updatedCartItem);
  } catch (err) {
    next(err);
  }
});

cartRouter.delete("/:cartItemID", async (req, res, next) => {
  const cartItemID = req.params.cartItemID;

  try {
    await deleteCartItem(cartItemID);
    res.send({ message: "Successfully deleted cart item" });
  } catch (err) {
    next(err);
  }
});

module.exports = cartRouter;
