const JobType = require("../models").JobType;

const getJobTypes = async (req, res, _) => {
  try {
    const JobTypes = await JobType.findAll();
    return res.json(JobTypes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting jobType.",
      description: error.message,
    });
  }
};

const getActiveJobTypes = async (req, res, _) => {
  try {
    const JobTypes = await JobType.findAll({
      where: { status: "Active" },
    });
    return res.json(JobTypes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting jobType.",
      description: error.message,
    });
  }
};

const getJobType = async (req, res, _) => {
  try {
    const jobType = await JobType.findOne({
      where: { id: req.params.id },
    });
    await JobType.upsert(jobType);
    return res.json(jobType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting jobType.",
      description: error.message,
    });
  }
};

const postJobType = async (req, res, _) => {
  try {
    delete req.body.id;
    const jobType = await JobType.create(req.body);
    return res.json(jobType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating jobType.",
      description: error.message,
    });
  }
};

const putJobTypes = async (req, res, _) => {
  try {
    const jobType = await JobType.findOne({
      where: { id: req.params.id },
    });
    if (!jobType) {
      return res.status(403).json({
        message: "Invalid jobType Id",
        description: "User is not authorized to update jobType.",
      });
    }
    const exp = await JobType.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating jobType.",
      description: error.message,
    });
  }
};

const deleteJobType = async (req, res, _) => {
  try {
    const jobType = await JobType.destroy({
      where: { id: req.params.id },
    });
    return res.json(jobType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting jobType.",
      description: error.message,
    });
  }
};

module.exports = {
  getJobTypes,
  getActiveJobTypes,
  getJobType,
  postJobType,
  putJobTypes,
  deleteJobType,
};
