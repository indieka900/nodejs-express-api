const express = require('express');
const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
    updateUser: async (req, res) => {
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString()
        }
        try{
            const updateUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body
                },{ new: true }
            );
            const {password, __v, createdAt, ...others} = updateUser._doc;
            res.status(200).json(others)
        }catch(err){
            res.status(401).json(err);
        }
    },

    //delete user
    deleteUser: async (res, req) =>{
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Succcesfully Deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //get a user
    getUser: async (res, req) =>{
        try {
            const user = await User.findById(req.params.id)
            const {password,__v, createdAt, updatedAt, ...userdata} = user._doc;
            res.status(200).json(userdata)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //get all users
    getAllUsers: async (res, req) =>{
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    }


}