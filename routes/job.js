const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyandAdmin} = require("../middleware/verifyToken")


//Post a job
router.post("/",verifyandAdmin,jobController.createJob);

// Update Job
router.put("/:id",verifyandAdmin,jobController.updateJob);

//Delete Job
router.delete("/:id",verifyandAdmin,jobController.deleteJob);

//Get a Job
router.get("/:id",jobController.getJob);

//Get all Jobs
router.get("/",jobController.getAllJobs);

//Search jobs
router.get("/search/:key",jobController.searchJobs);

module.exports = router