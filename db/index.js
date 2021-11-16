// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'groovyFinds'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// export
module.exports = {
  client,
  // db methods
  ...require('./users'), 
  ...require('./albums')
}

