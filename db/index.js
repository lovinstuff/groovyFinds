// export
module.exports = {
  // db methods
  ...require('./users'), 
  ...require('./albums'), 
  ...require('./cart_item'), 
  ...require('./shopping_session'),
  ...require('./Products')
}

