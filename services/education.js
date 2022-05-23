const Education = require("../models").Education;

const getEducations = async (req, res, _) => {
  try {
    const Educations = await Education.findAll();
    return res.json(Educations);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting education.",
      description: error.message,
    });
  }
};

const getActiveEducations = async (req, res, _) => {
  try {
    const Educations = await Education.findAll({
      where: { status: "Active" },
    });
    return res.json(Educations);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting education.",
      description: error.message,
    });
  }
};

const getEducation = async (req, res, _) => {
  try {
    const education = await Education.findOne({
      where: { id: req.params.id },
    });
    await Education.upsert(education);
    return res.json(education);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting education.",
      description: error.message,
    });
  }
};

const postEducation = async (req, res, _) => {
  try {
    delete req.body.id;
    const education = await Education.create(req.body);
    return res.json(education);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating education.",
      description: error.message,
    });
  }
};

const putEducation = async (req, res, _) => {
  try {
    const education = await Education.findOne({
      where: { id: req.params.id },
    });
    if (!education) {
      return res.status(403).json({
        message: "Invalid education Id",
        description: "User is not authorized to update education.",
      });
    }
    const exp = await Education.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating education.",
      description: error.message,
    });
  }
};

const deleteEducation = async (req, res, _) => {
  try {
    const education = await Education.destroy({
      where: { id: req.params.id },
    });
    return res.json(education);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting education.",
      description: error.message,
    });
  }
};

module.exports = {
  getEducations,
  getActiveEducations,
  getEducation,
  postEducation,
  putEducation,
  deleteEducation,
};
