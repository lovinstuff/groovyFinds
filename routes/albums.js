const express = require("express");
const albumsRouter = express.Router();
const { createAlbum, getAllAlbums } = require("../db");

// gets all the albums
albumsRouter.get("/", async (req, res, next) => {
  try {
    const allAlbums = await getAllAlbums();

    res.send(allAlbums);
  } catch (err) {
    next(err);
  }
});

albumsRouter.post("/", async (req, res, next) => {
  const { name, artist, image_url, price } = req.body;
  try {
    const newAlbum = await createAlbum({ name, artist, image_url, price });
    res.send(newAlbum);
  } catch (err) {
    throw err;
  }
});

module.exports = albumsRouter;
