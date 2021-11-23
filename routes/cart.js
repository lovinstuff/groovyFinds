const express = require('express');
const cartRouter = express.Router();
const {
    getCurrentSessionCartItems,
    addToCart, 
    changeItemQuantity, 
    deleteCartItem
} = require('../db')

const {
    getSessionId
} = require('../auth');

cartRouter.get('/', async (req, res, next) => {
    try {
        const cartItems = await getCurrentSessionCartItems();

        res.send( cartItems )
    } catch (err) {
        res.status(400)
        next(err);
    }
})

cartRouter.patch('/', async (req, res, next) => {
    const { albumId, price, quantity } = req.body;
    const sessionId = getSessionId();

    try {
        const newCartItem = await addToCart(sessionId, albumId, price, quantity);

        res.send(newCartItem);
    } catch (err) {
        next(err);
    }
})

cartRouter.post('/:cartItemID', async (req, res, next) => {
    const { quantity } = req.body;
    const cartItemID = req.params.cartItemID;

    try {
        const updatedCartItem = await changeItemQuantity(cartItemID, quantity);

        res.send(updatedCartItem);
    } catch (err) {
        next(err);
    }
})

cartRouter.delete('/:cartItemID', async (req, res, next) => {
    const cartItemID = req.params.cartItemID;

    try {
        await deleteCartItem(cartItemID);
    } catch(err) {
        next(err)
    }
})


module.exports = cartRouter;