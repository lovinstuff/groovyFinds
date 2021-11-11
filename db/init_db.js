// code to build and initialize DB goes here
const {
  client, 
  // other db methods 
  createUser, 
  createAlbum
} = require('./index');

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS vinyls;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );

      CREATE TABLE albums(
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL, 
        artist varchar(255) NOT NULL, 
        image_url varchar(255), 
        price integer
      );
  `)

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("creating users: ")
    const usersToCreate = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ]

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log("Finished creating users!")

    console.log("creating albums: ");
    const albumsToCreate = [
      { name: "What's Going On", artist: "Marvin Gaye", image_url: "https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg", price: 70 }, 
      { name: "Pet Sounds", artist: "The Beach Boys", image_url: "https://i.scdn.co/image/ab67616d0000b27365eb1ad8d8a037029ad41e4a", price: 100 }, 
      { name: "Blue", artist: "Joni Mitchell", image_url: "https://upload.wikimedia.org/wikipedia/en/e/e1/Bluealbumcover.jpg", price: 95 }, 
      { name: "Permanent Waves", artist: "Rush", image_url: "https://upload.wikimedia.org/wikipedia/en/5/51/Rush_Permanent_Waves.jpg", price: 200 }, 
      { name: "Love Yourself: Tear", artist: "BTS", image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Love_Yourself_Tear_Cover.jpeg/220px-Love_Yourself_Tear_Cover.jpeg", price: 50 }, 
      { name: "Thriller", artist: "Michael Jackson", image_url: "https://images-na.ssl-images-amazon.com/images/I/712aTlKjhqL._SL1500_.jpg", price: 500 }, 
      { name: "Back in Black", artist: "AC/DC", image_url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Acdc_backinblack_cover.jpg", price: 400 }, 
      { name: "The Dark Side of the Moon", artist: "Pink Floyd", image_url: "https://images-na.ssl-images-amazon.com/images/I/61R7gJadP7L._SX355_.jpg", price: 450 }, 
      { name: "The Bodyguard", artist: "Whitney Houston", image_url: "https://lastfm.freetls.fastly.net/i/u/770x0/8eed8ec437944c00cc8c4a306283de9b.jpg", price: 350 }, 
      { name: "Bat Out of Hell", artist: "Meat Loaf", image_url: "https://usercontent.one/wp/www.alltopeverything.com/wp-content/uploads/2020/05/Meat-Loaf-Bat-out-Of-Hell-600x600.jpg?media=1633479099", price: 300 }, 
    ]

    const albums = await Promise.all(albumsToCreate.map(createAlbum));

    console.log('Albums created:');
    console.log(albums)
    console.log('Finished creating albums!')
  } catch (error) {
    console.log("There was an error creating users!")
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());