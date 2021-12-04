// export
module.exports = {
  // db methods
  ...require('./users'), 
  ...require('./cart_item'), 
  ...require('./shopping_session'),
  ...require('./products')
}

