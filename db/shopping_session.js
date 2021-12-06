const client = require("./client");
const { storeSessionId } = require('../auth')

const createShoppingSession = async () => {
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
            INSERT INTO shopping_session(user_id, created_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
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

module.exports = {
  createShoppingSession 
};
