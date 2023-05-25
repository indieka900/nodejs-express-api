const Job = require("../models/Job")


module.exports = {
    //create job
    createJob: async (req, res) => {
        const newJob = new Job(req.body);

        try {
            const savedJob = await newJob.save();
            const {__v, createdAt, updatedAt, ...newJobInfo } = savedJob._doc;
            res.status(200).json(newJobInfo);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //update job
    updateJob: async (req, res) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            const {__v, createdAt, updatedAt, ...updatedJobInfo} = updatedJob._doc;
            res.status(200).json(updatedJobInfo)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //delete job
    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id)
            res.status(200).json(" Job Deleted succesfully ")
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //get a Job
    getJob: async (res, req) =>{
        try {
            const job = await Job.findById(req.params.id);
            const { __v, createdAt, updatedAt, ...jobInfo } = job._doc;
            req.status(200).json(jobInfo);
        } catch (error) {
            //console.log(error);
            res.status(500).json(error)
        }
    },

    //get all Jobs
    getAllJobs: async (res, req) =>{
        try {
            const job = await Job.find();
            req.status(200).json(job)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //Searching for a jobs
    searchJobs: async (res, req) => {
        try {
            const results = await Job.aggregate(
                [
                    {
                      $search: {
                        index: "default",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json(error)
        }
    }


}