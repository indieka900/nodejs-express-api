const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const { verifyToken, verifyandAuthorization } = require("../middleware/verifyToken");



// CREATE BOOKMARKS
router.post("/", verifyandAuthorization, bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id", verifyToken, bookmarkController.deleteBookmark);


// GET BOOKMARKS
router.get("/:userId", bookmarkController.getBookmarks);



module.exports = router