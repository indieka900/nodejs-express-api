const router = require("express").Router();
const userController = require("../controllers/userController");
const {verifyandAuthorization, verifyToken, verifyandAdmin} = require("../middleware/verifyToken")

// Update User
router.put("/:id",verifyandAuthorization,userController.updateUser);

//Delete User
router.delete("/:id",userController.deleteUser);

//Get a User
router.get("/:id",verifyandAuthorization,userController.getUser);

//Get all users
router.get("/",verifyandAdmin,userController.getAllUsers);

module.exports = router