const client = require("./client");
const { storeSessionId } = require('../auth')

const createShoppingSession = async (user_id) => {
  // this function should be called when there is no shopping session stored in the local storage, and a user adds an item to the cart
  // returns the session id, so we can store it to the local storage
  try {
    const {
      rows: [session],
    } = await client.query(
      `
            INSERT INTO shopping_session(user_id, created_at)
            VALUES ($1, CURRENT_TIMESTAMP)
            RETURNING *;
        `,
      [user_id]
    );
    storeSessionId(session.id);
    return session.id;
  } catch (err) {
    throw err;
  }
};

const updateShoppingSessionToFalse = async (id) => {
  try {
    const {rows: [updatedShoppingSession]} = await client.query(`
      UPDATE shopping_session
      SET is_active=false
      WHERE id=$1
      RETURNING *;
    `, [id])
    return updatedShoppingSession;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createShoppingSession, 
  updateShoppingSessionToFalse
};
