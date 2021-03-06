const client = require("./client");
//const { getSessionId } = require('../auth')

const addToCart = async (
  sessionId,
  albumId,
  name,
  price,
  image_url,
  quantity = 1
) => {
  try {
    const {
      rows: [newCartItem],
    } = await client.query(
      `
            INSERT INTO cart_item (session_id, album_id, name, price, image_url, quantity)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [sessionId, albumId, name, price, image_url, quantity]
    );
    return newCartItem;
  } catch (err) {
    throw err;
  }
};

const checkActiveSession = async (user_id) => {
  try {
    const {rows: [shoppingSession]} = await client.query(`
      SELECT is_active FROM shopping_session
      WHERE is_active=true AND user_id=$1;
    `, [user_id]);
    if (shoppingSession) {
      return true;
    }
    const {rows: [newShoppingSession]} = await client.query(`
      INSERT INTO shopping_session(user_id, created_at, is_active)
      VALUES ($1, CURRENT_TIMESTAMP, $2)
      RETURNING *;
    `, [user_id, true]);

    return newShoppingSession;
  } catch (err) {
    throw err;
  }
}

const getCartItemsByUser = async (user_id) => {
  try {
    await checkActiveSession(user_id);

    const { rows: cartItems } = await client.query(`
      SELECT * FROM cart_item
      JOIN shopping_session ON shopping_session.id=cart_item.session_id
      WHERE shopping_session.user_id=$1 AND shopping_session.is_active=true;
    `, [user_id])

    return cartItems;
  } catch (err) {
    throw err;
  }
}

const changeItemQuantity = async (id, newQuantity) => {
  try {
    const {
      rows: [updatedCartItem],
    } = await client.query(
      `
            UPDATE cart_item
            SET quantity=$1
            WHERE id=$2
            RETURNING *;
        `,
      [newQuantity, id]
    );

    return updatedCartItem;
  } catch (err) {
    throw err;
  }
};

const deleteCartItem = async (id) => {
  try {
    await client.query(
      `
            DELETE FROM cart_item
            WHERE id=$1;
        `,
      [id]
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addToCart,
  changeItemQuantity,
  deleteCartItem,
  getCartItemsByUser, 
  checkActiveSession
};
