const express = require("express");
const adminRouter = express.Router();
const { getAllUsers } = require("../db");

function AdminCheck (req, res, next) {
  console.log (req.user, "Hello");
  if (!req.user){
    res.status(401)
    next({name:"Login Error" , message: "You logged in to this route" })
    
        }
  else if (!req.user.isadmin){
          res.status(403)
          next({name:"Admin Error" , message: "Permission Denied!" })
          
              }
  else {

    next()

  }
        
}


adminRouter.get("/", AdminCheck, async (req, res, next) => {
    try {
      const allUsers = await getAllUsers();
  
      res.send(allUsers);
    } catch (err) {
      next(err);
    }
  });

  module.exports = adminRouter;