const User = require("../models/User");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
        if (err) return res.status(403).json("Invalid Token");
        
        req.user = user;
        console.log(user);
        next();
        
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  };
  

  const verifyandAuthorization = async (req, res, next) => {
    verifyToken(req,res, () => {
      if(req.user.id === req.params.id){
        next();
      } else {
        res.status(403).json("You are restricted from performing the task");
      }
    })
  };


  const verifyandAdmin = async (req, res, next) => {
    verifyToken(req,res, () => {
      if(req.user.isAdmin){
        next();
      } else {
        res.status(403).json("You are restricted from performing the task");
      }
    })
  };
  
  
module.exports = {verifyToken, verifyandAuthorization, verifyandAdmin };
