// code to build and initialize DB goes here

const client = require('./client');
const {
  // other db methods
  createUser,
  createAlbum,
} = require("./index");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS cart_item;
      DROP TABLE IF EXISTS shopping_session;
      DROP TABLE IF EXISTS albums;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        isadmin BOOLEAN DEFAULT false
      );

      CREATE TABLE albums(
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL, 
        artist varchar(255) NOT NULL, 
        genre varchar(255) NOT NULL, 
        image_url varchar(255), 
        price integer
      );

      CREATE TABLE shopping_session(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id), 
        total INTEGER, 
        created_at TIMESTAMP
      );

      CREATE TABLE cart_item(
        id SERIAL PRIMARY KEY, 
        session_id INTEGER REFERENCES shopping_session(id), 
        album_id INTEGER REFERENCES albums(id),
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
      { username: "albert", password: "bertie99", email: "albert@123.com" },
      { username: "sandra", password: "sandra123", email: "sandra@123.com"},
      { username: "glamgal", password: "glamgal123", email: "glamgal@123.com"},
    ];

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");

    console.log("creating albums: ");
    const albumsToCreate = [
      {
        name: "What's Going On",
        artist: "Marvin Gaye",
        genre: "Motown",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg",
        price: 70,
      },
      {
        name: "Pet Sounds",
        artist: "The Beach Boys",
        genre: "Rock",
        image_url:
          "https://i.scdn.co/image/ab67616d0000b27365eb1ad8d8a037029ad41e4a",
        price: 100,
      },
      {
        name: "Blue",
        artist: "Joni Mitchell",
        genre: "Folk",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/e/e1/Bluealbumcover.jpg",
        price: 95,
      },
      {
        name: "Permanent Waves",
        artist: "Rush",
        genre: "Rock",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/5/51/Rush_Permanent_Waves.jpg",
        price: 200,
      },
      {
        name: "Love Yourself: Tear",
        artist: "BTS",
        genre: "K-Pop",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Love_Yourself_Tear_Cover.jpeg/220px-Love_Yourself_Tear_Cover.jpeg",
        price: 50,
      },
      {
        name: "Thriller",
        artist: "Michael Jackson",
        genre: "Disco",
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/712aTlKjhqL._SL1500_.jpg",
        price: 500,
      },
      {
        name: "Back in Black",
        artist: "AC/DC",
        genre: "Rock",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/b/be/Acdc_backinblack_cover.jpg",
        price: 400,
      },
      {
        name: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        genre: "Rock",
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/61R7gJadP7L._SX355_.jpg",
        price: 450,
      },
      {
        name: "The Bodyguard",
        artist: "Whitney Houston",
        genre: "Pop", 
        image_url:
          "https://lastfm.freetls.fastly.net/i/u/770x0/8eed8ec437944c00cc8c4a306283de9b.jpg",
        price: 350,
      },
      {
        name: "Bat Out of Hell",
        artist: "Meat Loaf",
        genre: "Rock", 
        image_url:
          "https://usercontent.one/wp/www.alltopeverything.com/wp-content/uploads/2020/05/Meat-Loaf-Bat-out-Of-Hell-600x600.jpg?media=1633479099",
        price: 300,
      },
    ];

    const albums = await Promise.all(albumsToCreate.map(createAlbum));

    console.log("Albums created:");
    console.log(albums);
    console.log("Finished creating albums!");
  } catch (error) {
    console.log("There was an error creating users!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
