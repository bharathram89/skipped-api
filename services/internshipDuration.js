const InternshipDuration = require("../models").InternshipDuration;

const getInternshipDurations = async (req, res, _) => {
  try {
    const InternshipDurations = await InternshipDuration.findAll();
    return res.json(InternshipDurations);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting internshipDuration.",
      description: error.message,
    });
  }
};

const getActiveInternshipDurations = async (req, res, _) => {
  try {
    const InternshipDurations = await InternshipDuration.findAll({
      where: { status: "Active" },
    });
    return res.json(InternshipDurations);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting internshipDuration.",
      description: error.message,
    });
  }
};

const getInternshipDuration = async (req, res, _) => {
  try {
    const internshipDuration = await InternshipDuration.findOne({
      where: { id: req.params.id },
    });
    await InternshipDuration.upsert(internshipDuration);
    return res.json(internshipDuration);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting internshipDuration.",
      description: error.message,
    });
  }
};

const postInternshipDuration = async (req, res, _) => {
  try {
    delete req.body.id;
    const internshipDuration = await InternshipDuration.create(req.body);
    return res.json(internshipDuration);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating internshipDuration.",
      description: error.message,
    });
  }
};

const putInternshipDuration = async (req, res, _) => {
  try {
    const internshipDuration = await InternshipDuration.findOne({
      where: { id: req.params.id },
    });
    if (!internshipDuration) {
      return res.status(403).json({
        message: "Invalid internshipDuration Id",
        description: "User is not authorized to update internshipDuration.",
      });
    }
    const exp = await InternshipDuration.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating internshipDuration.",
      description: error.message,
    });
  }
};

const deleteInternshipDuration = async (req, res, _) => {
  try {
    const internshipDuration = await InternshipDuration.destroy({
      where: { id: req.params.id },
    });
    return res.json(internshipDuration);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting internshipDuration.",
      description: error.message,
    });
  }
};

module.exports = {
  getInternshipDurations,
  getInternshipDuration,
  getActiveInternshipDurations,
  postInternshipDuration,
  putInternshipDuration,
  deleteInternshipDuration,
};
