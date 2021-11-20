const express = require("express");
const adminRouter = express.Router();
const { getAllUsers } = require("../db");

adminRouter.get("/", async (req, res, next) => {
    try {
      const allUsers = await getAllUsers();
  
      res.send(allUsers);
    } catch (err) {
      next(err);
    }
  });

  module.exports = adminRouter;