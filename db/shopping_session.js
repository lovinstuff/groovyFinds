const client = require("./client");
const { getSessionId } = require('../auth')

const createShoppingSession = async ({ user_id, total }) => {
  // this function should be called when there is no shopping session stored in the local storage, and a user adds an item to the cart
  // returns the session id, so we can store it to the local storage
  if (!user_id) {
    user_id = null;
  }
  try {
    const {
      rows: [session],
    } = await client.query(
      `
            INSERT INTO shopping_session(user_id, total, created_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
            RETURNING *;
        `,
      [user_id, total]
    );

    return session.id;
  } catch (err) {
    throw err;
  }
};

const updateShoppingSessionUser = async ({ id, user_id }) => {
  // this function is to update the user id if the session was originally created by a not logged in user
  // should call this function if there are things in the cart, and the user decides to log in.
  try {
    const {
      rows: [updatedSession],
    } = await client.query(
      `
        UPDATE shopping_session
        SET user_id = $1
        WHERE id=$2
        RETURNING *;
    `,
      [user_id, id]
    );

    return updatedSession;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createShoppingSession,
  updateShoppingSessionUser 
};
