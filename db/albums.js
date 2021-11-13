const client = require("./index");

async function getAllAlbums() {
  try {
    const {rows: albums} = await client.query(`
      SELECT * FROM albums;
    `)

    return albums;
  } catch(err) {
    throw err;
  }
}

async function createAlbum({ name, artist, image_url, price }) {
  try {
    const {
      rows: [album],
    } = await client.query(
      `
            INSERT INTO albums (name, artist, image_url, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      { name, artist, image_url, price }
    );

    return album;
  } catch (err) {
    throw err;
  }
}

async function getAlbumById(id) {
  try {
    const {
      rows: [album],
    } = await client.query(`
              SELECT * FROM albums WHERE id=${id};
          `);
    return album;
  } catch (err) {
    throw err;
  }
}

async function getAlbumByName(name) {
  try {
    const {
      rows: [album],
    } = await client.query(`
            SELECT * FROM albums WHERE name=${name};
        `);

    return album;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createAlbum, 
  getAllAlbums, 
  getAlbumById, 
  getAlbumByName
};
