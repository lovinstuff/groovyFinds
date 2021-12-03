const express = require("express");
const adminRouter = express.Router();
const { getAllUsers } = require("../db");

function AdminCheck (req, res, next) {
  if (!req.user){
    res.status(401)
    next({name:"Login Error" , message: "You logged in to this route" })
    
        }
  if (!req.user.admin){
          res.status(403)
          next({name:"Admin Error" , message: "Permission Denied!" })
          
              }
    
    next()
        
}


adminRouter.get("/", async (req, res, next) => {
    try {
      const allUsers = await getAllUsers();
  
      res.send(allUsers);
    } catch (err) {
      next(err);
    }
  });

  module.exports = adminRouter;