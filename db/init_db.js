// code to build and initialize DB goes here

const client = require("./client");
const {
  // other db methods
  // createProduct,
  createUser,
  createProduct,
} = require("./index");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS cart_item;
      DROP TABLE IF EXISTS shopping_session;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        price DECIMAL DEFAULT 0,
        image_url TEXT NOT NULL,
        type VARCHAR(255) NOT NULL,
        in_stock BOOLEAN DEFAULT true,
        inventory INTEGER NOT NULL,
        active BOOLEAN DEFAULT true
      );

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        isadmin BOOLEAN DEFAULT false
      );

      CREATE TABLE shopping_session(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id), 
        created_at TIMESTAMP, 
        is_active BOOLEAN NOT NULL
      );

      CREATE TABLE cart_item(
        id SERIAL PRIMARY KEY, 
        session_id INTEGER REFERENCES shopping_session(id), 
        album_id INTEGER REFERENCES products(id), 
        name VARCHAR(255) UNIQUE NOT NULL, 
        price integer, 
        image_url TEXT NOT NULL, 
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP
      );
  `); // my idea behind the shopping_session table is that each time someone is on the page on the same browser, they have an active shopping session, and cart_item table, we will get the cart items from cart_items where session_id is equal to the current active shopping session.
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("creating users: ");
    const usersToCreate = [
      {
        username: "albert",
        password: "bertie99",
        email: "albert@123.com",
        isAdmin: "true",
      },
      { username: "sandra", password: "sandra123", email: "sandra@123.com" },
      { username: "glamgal", password: "glamgal123", email: "glamgal@123.com" },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");

    const productsToCreate = [
      {
        name: "What's Going On",
        description: "Jams by Marvin Gaye",
        price: 70,
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg",
        type: "record",
        in_stock: true,
        inventory: 3,
      },
      {
        name: "Pet Sounds",
        description: "Jams by The Beach Boys",
        price: 100,
        image_url:
          "https://i.scdn.co/image/ab67616d0000b27365eb1ad8d8a037029ad41e4a",
        type: "record",
        in_stock: false,
        inventory: 0,
      },
      {
        name: "Blue",
        description: "Jams by Joni Mitchell",
        price: 95,
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/e/e1/Bluealbumcover.jpg",
        type: "record",
        in_stock: true,
        inventory: 17,
      },
      {
        name: "Permanent Waves",
        description: "Jams by Rush",
        price: 200,
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/5/51/Rush_Permanent_Waves.jpg",
        type: "record",
        in_stock: true,
        inventory: 15,
      },
      {
        name: "Love Yourself: Tear",
        description: "Jams by BTS",
        price: 50,
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Love_Yourself_Tear_Cover.jpeg/220px-Love_Yourself_Tear_Cover.jpeg",
        type: "record",
        in_stock: true,
        inventory: 84,
      },
      {
        name: "Thriller",
        description: "Jams by Michael Jackson",
        price: 500,
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/712aTlKjhqL._SL1500_.jpg",
        type: "record",
        in_stock: true,
        inventory: 12,
      },
      {
        name: "Back in Black",
        description: "Jams by AC/DC",
        price: 400,
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/b/be/Acdc_backinblack_cover.jpg",
        type: "record",
        in_stock: false,
        inventory: 0,
      },
      {
        name: "The Dark Side of the Moon",
        description: "Jams by Pink Floyd",
        price: 450,
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/61R7gJadP7L._SX355_.jpg",
        type: "record",
        in_stock: true,
        inventory: 2,
      },
      {
        name: "The Bodyguard",
        description: "Jams by Whitney Houston",
        price: 400,
        image_url:
          "https://lastfm.freetls.fastly.net/i/u/770x0/8eed8ec437944c00cc8c4a306283de9b.jpg",
        type: "record",
        in_stock: true,
        inventory: 3,
      },
      {
        name: "Bat Out of Hell",
        description: "Jams by Meat Loaf",
        price: 300,
        image_url:
          "https://usercontent.one/wp/www.alltopeverything.com/wp-content/uploads/2020/05/Meat-Loaf-Bat-out-Of-Hell-600x600.jpg?media=1633479099",
        type: "record",
        in_stock: true,
        inventory: 4,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");
  } catch (error) {
    console.log("There was an error creating users!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
