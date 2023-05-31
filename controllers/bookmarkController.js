const Bookmark = require("../models/Bookmark");
const Job = require("../models/Job");


module.exports = {
    createBookmark: async (req, res) => {
        const jobId = req.body.job;
        try {
            const job = await Job.findById(jobId);
            if(!job){
                return res.status(404).json({error: "Job was not found"});
            }
            const newbookmark =new Bookmark({job: job, userId: req.user.id})
            const savedBookmark = await newbookmark.save();
            const { __v, updatedAt, ...newbookmarkinfo } = savedBookmark._doc;
            res.status(200).json(newbookmarkinfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteBookmark: async (req, res) => {
        try {
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(200).json("Bookmark Succesfully delete");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({ userId: req.params.userId });
            res.status(200).json("Bookmark Succesfully delete");
        } catch (error) {
            res.status(500).json(error);
        }
    },

}