const JobTitle = require("../models").JobTitle;

const getjobTitles = async (req, res, _) => {
  try {
    const Industries = await JobTitle.findAll();
    return res.json(Industries);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting jobTitle.",
      description: error.message,
    });
  }
};

const getActiveJobTitles = async (req, res, _) => {
  try {
    const Industries = await JobTitle.findAll({
      where: { status: "Active" },
    });
    return res.json(Industries);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting jobTitle.",
      description: error.message,
    });
  }
};

const getJobTitle = async (req, res, _) => {
  try {
    const jobTitle = await JobTitle.findOne({
      where: { id: req.params.id },
    });
    await JobTitle.upsert(jobTitle);
    return res.json(jobTitle);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting jobTitle.",
      description: error.message,
    });
  }
};

const postJobTitle = async (req, res, _) => {
  try {
    delete req.body.id;
    const jobTitle = await JobTitle.create(req.body);
    return res.json(jobTitle);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating jobTitle.",
      description: error.message,
    });
  }
};

const putJobTitle = async (req, res, _) => {
  try {
    const jobTitle = await JobTitle.findOne({
      where: { id: req.params.id },
    });
    if (!jobTitle) {
      return res.status(403).json({
        message: "Invalid jobTitle Id",
        description: "User is not authorized to update jobTitle.",
      });
    }
    const exp = await JobTitle.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating jobTitle.",
      description: error.message,
    });
  }
};

const deleteJobTitle = async (req, res, _) => {
  try {
    const jobTitle = await JobTitle.destroy({
      where: { id: req.params.id },
    });
    return res.json(jobTitle);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting jobTitle.",
      description: error.message,
    });
  }
};

module.exports = {
  getjobTitles,
  getJobTitle,
  postJobTitle,
  putJobTitle,
  deleteJobTitle,
  getActiveJobTitles,
};
