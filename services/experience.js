const JobExperience = require("../models").JobExperience;

const getExperiences = async (req, res, _) => {
  try {
    const Experiences = await JobExperience.findAll();
    return res.json(Experiences);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting experience.",
      description: error.message,
    });
  }
};

const getActiveExperiences = async (req, res, _) => {
  try {
    const Experiences = await JobExperience.findAll({
      where: { status: "Active" },
    });
    return res.json(Experiences);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting experience.",
      description: error.message,
    });
  }
};

const getExperience = async (req, res, _) => {
  try {
    const experience = await JobExperience.findOne({
      where: { id: req.params.id },
    });
    await JobExperience.upsert(experience);
    return res.json(experience);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting experience.",
      description: error.message,
    });
  }
};

const postExperience = async (req, res, _) => {
  try {
    delete req.body.id;
    const experience = await JobExperience.create(req.body);
    return res.json(experience);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating experience.",
      description: error.message,
    });
  }
};

const putExperience = async (req, res, _) => {
  try {
    const experience = await JobExperience.findOne({
      where: { id: req.params.id },
    });
    if (!experience) {
      return res.status(403).json({
        message: "Invalid experience Id",
        description: "User is not authorized to update experience.",
      });
    }
    const exp = await JobExperience.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating experience.",
      description: error.message,
    });
  }
};

const deleteExperience = async (req, res, _) => {
  try {
    const experience = await JobExperience.destroy({
      where: { id: req.params.id },
    });
    return res.json(experience);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting experience.",
      description: error.message,
    });
  }
};

module.exports = {
  getExperiences,
  getActiveExperiences,
  getExperience,
  postExperience,
  putExperience,
  deleteExperience,
};
