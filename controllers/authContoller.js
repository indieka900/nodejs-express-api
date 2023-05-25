const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

module.exports = {
    //registering user
    createUser: async (req, res) =>{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        });
        try {
            const savedUser = await newUser.save();
            const {password, __v, createdAt, ...others} = savedUser._doc;
            res.status(201).json(others);
        }catch(error){
            res.status(500).json(error);
        }
    },

    //login user
    loginUser: async (req, res) => {
        try {
          const user = await User.findOne({
            email: req.body.email,
          });
      
          if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }
      
          const decryptpass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
          const pass = decryptpass.toString(CryptoJS.enc.Utf8);
      
          if (pass !== req.body.password) {
            return res.status(401).json('Wrong Password');
          }
      
          const token = jwt.sign({
            email: user.email,
            password: user.password,
          }, process.env.JWT_SEC, {
            expiresIn: '30h',
          });
      
          res.status(200).json({
            user: user,
            token,
          });
          
        } catch (error) {
        }
      },
      
}