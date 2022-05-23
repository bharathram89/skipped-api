const JobApplication = require("../models").JobApplication;
const Job = require("../models").Job;
const constants = require("../utils/constants").constants;

const getJobApplications = async (req, res, _) => {
  try {
    let jobApplication;
    if (req.body.profile.roleTag === constants.ROLE_TAGS.RECRUITER) {
      if (req.query.jobId) {
        jobApplication = await JobApplication.findAll({
          where: { jobCreatedBy: req.body.profile.id, jobId: req.query.jobId },
          include: [{ model: Job, as: "job" }],
          raw: true,
          nest: true,
        });
      } else {
        jobApplication = await JobApplication.findAll({
          where: { jobCreatedBy: req.body.profile.id },
          include: [{ model: Job, as: "job" }],
          nest: true,
          raw: true,
        });
      }
    } else if (req.body.profile.roleTag === constants.ROLE_TAGS.CANDIDATE) {
      if (req.query.jobId) {
        jobApplication = await JobApplication.findAll({
          where: { appliedBy: req.body.profile.id, jobId: req.query.jobId },
          include: [{ model: Job, as: "job" }],
          raw: true,
          nest: true,
        });
      } else {
        jobApplication = await JobApplication.findAll({
          where: { appliedBy: req.body.profile.id },
          include: [{ model: Job, as: "job" }],
          raw: true,
          nest: true,
        });
      }
    } else {
      if (req.query.jobId) {
        jobApplication = await JobApplication.findAll({
          where: { jobId: req.query.jobId },
          include: [{ model: Job, as: "job" }],
          raw: true,
          nest: true,
        });
      } else {
        jobApplication = await JobApplication.findAll({
          include: [{ model: Job, as: "job" }],
          raw: true,
          nest: true,
        });
      }
    }
    return res.json(jobApplication);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while fetching jobs.",
      description: error.message,
    });
  }
};

const getJobApplication = async (req, res, _) => {
  try {
    let jobApplication;
    if (req.body.profile.roleTag === constants.ROLE_TAGS.RECRUITER) {
      jobApplication = await JobApplication.findOne({
        where: { id: req.params.id, jobCreatedBy: req.body.profile.id },
        include: [{ model: Job, as: "job" }],
        nest: true,
        raw: true,
      });
      if (!job) {
        return res.status(403).json({
          message: "Cannot find job application for provided id.",
          description: "Job application not found for given profile.",
        });
      }
    } else if (req.body.profile.roleTag === constants.ROLE_TAGS.CANDIDATE) {
      jobApplication = await JobApplication.findOne({
        where: { id: req.params.id, appliedBy: req.body.profile.id },
        include: [{ model: Job, as: "job" }],
        nest: true,
        raw: true,
      });
      if (!jobApplication) {
        return res.status(403).json({
          message: "Cannot find job application for provided id.",
          description: "Job application not found for given profile.",
        });
      }
    } else {
      jobApplication = await JobApplication.findOne({
        where: { id: req.params.id },
        include: [{ model: Job, as: "job" }],
        nest: true,
        raw: true,
      });
      if (!jobApplication) {
        return res.status(403).json({
          message: "Invalid job application.",
          description: "Job application id is invalid.",
        });
      }
    }
    return res.json(jobApplication);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting job application.",
      description: error.message,
    });
  }
};

const postJobApplication = async (req, res, _) => {
  try {
    if (req.body.profile.roleTag !== constants.ROLE_TAGS.CANDIDATE) {
      return res.status(403).json({
        message: "Recruiter cannot apply for job.",
        description: "Job cannot be applied by recruiter.",
      });
    }
    let job = await Job.findOne({ where: { id: req.body.jobId }, raw: true });
    if (!job) {
      return res.status(404).json({
        message: "Invalid job id.",
        description: "Job cannot be found for provided job id.",
      });
    }
    delete req.body.id;
    req.body.appliedBy = req.body.profile.id;
    req.body.jobCreatedBy = job.createdBy;
    req.body.lastUpdatedBy = req.body.profile.id;
    req.body.status = "1";
    req.body.applicantMessage = req.body.message;
    const jobApplication = await JobApplication.create(req.body);
    return res.json(jobApplication);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while applying for job.",
      description: error.message,
    });
  }
};

const putJobApplication = async (req, res, _) => {
  try {
    if (req.body.profile.roleTag === constants.ROLE_TAGS.CANDIDATE) {
      return res.status(403).json({
        message: "Candidate cannot update job status.",
        description: "Job status cannot be updated with candidate only.",
      });
    }
    let jobApplication = await JobApplication.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    if (!jobApplication) {
      return res.status(404).json({
        message: "Invalid job application id.",
        description: "Job application cannot be found for provided job id.",
      });
    }
    req.body.lastUpdatedBy = req.body.profile.id;
    jobApplication.status = req.body.status;
    jobApplication.type = req.body.type;
    jobApplication.reviewerMessage = req.body.message;
    jobApplication = await JobApplication.upsert(jobApplication);
    return res.json(jobApplication);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating job.",
      description: error.message,
    });
  }
};

const deleteJobApplication = async (req, res, _) => {
  try {
    let jobApplication = await JobApplication.findOne({
      where: { id: req.query.id },
      raw: true,
    });
    if (!jobApplication) {
      return res.status(404).json({
        message: "Invalid job application id.",
        description: "Job application cannot be found for provided job id.",
      });
    }
    if (req.body.profile.roleTag === constants.ROLE_TAGS.RECRUITER) {
      jobApplication = await JobApplication.findOne({
        where: { id: req.query.id, jobCreatedBy: req.body.profile.id },
        raw: true,
      });
      if (!job) {
        return res.status(403).json({
          message: "Cannot delete job application from another profile.",
          description:
            "Job application can only be deleted from profile you created.",
        });
      }
    } else if (req.body.profile.roleTag === constants.ROLE_TAGS.CANDIDATE) {
      jobApplication = await JobApplication.findOne({
        where: { id: req.query.id, appliedBy: req.body.profile.id },
        raw: true,
      });
      if (!jobApplication) {
        return res.status(403).json({
          message: "Cannot delete job application from another profile.",
          description:
            "Job application can only be deleted from profile you created.",
        });
      }
    }
    jobApplication = await JobApplication.destroy({
      where: { id: req.params.id },
    });
    return res.json(jobApplication);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting job application.",
      description: error.message,
    });
  }
};

module.exports = {
  getJobApplication,
  getJobApplications,
  postJobApplication,
  putJobApplication,
  deleteJobApplication,
};
