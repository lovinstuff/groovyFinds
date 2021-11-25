const client = require("./client");
const { getSessionId } = require('../auth')

const addToCart = async (sessionId, albumId, price, quantity = 1) => {
    try {
        const { rows:[newCartItem] } = await client.query(`
            INSERT INTO cart_item (session_id, album_id, price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [ sessionId, albumId, price, quantity ]);
        return newCartItem;
    } catch (err) {
        throw err;
    }
}

const getCurrentSessionCartItems = async () => {
    const sessionId = getSessionId();
    try {
        const { rows: cartItems } = await client.query(`
            SELECT * FROM cart_item WHERE session_id=$1;
        `, [sessionId])
        return cartItems;
    } catch (err) {
        throw err;
    }
}

const changeItemQuantity = async ( id, newQuantity ) => {
    try {
        const { rows: [updatedCartItem] } = await client.query(`
            UPDATE cart_item
            SET quantity=$1
            WHERE id=$2
            RETURNING *;
        `, [newQuantity, id]);

        return updatedCartItem;
    } catch (err) {
        throw err;
    }
}

const deleteCartItem = async (id) => {
    try {
        await client.query(`
            DELETE FROM cart_item
            WHERE id=$1;
        `, [id]);        
    } catch (err) {
        throw err;
    }
}



module.exports = {
    addToCart, 
    getCurrentSessionCartItems, 
    changeItemQuantity, 
    deleteCartItem
}