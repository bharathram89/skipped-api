const Industry = require("../models").Industry;

const getIndustries = async (req, res, _) => {
  try {
    const Industries = await Industry.findAll();
    return res.json(Industries);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting industry.",
      description: error.message,
    });
  }
};

const getActiveIndustries = async (req, res, _) => {
  try {
    const Industries = await Industry.findAll({
      where: { status: "Active" },
    });
    return res.json(Industries);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting industry.",
      description: error.message,
    });
  }
};

const getIndustry = async (req, res, _) => {
  try {
    const industry = await Industry.findOne({
      where: { id: req.params.id },
    });
    await Industry.upsert(industry);
    return res.json(industry);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting industry.",
      description: error.message,
    });
  }
};

const postIndustry = async (req, res, _) => {
  try {
    delete req.body.id;
    const industry = await Industry.create(req.body);
    return res.json(industry);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating industry.",
      description: error.message,
    });
  }
};

const putIndustry = async (req, res, _) => {
  try {
    const industry = await Industry.findOne({
      where: { id: req.params.id },
    });
    if (!industry) {
      return res.status(403).json({
        message: "Invalid industry Id",
        description: "User is not authorized to update industry.",
      });
    }
    const exp = await Industry.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating industry.",
      description: error.message,
    });
  }
};

const deleteIndustry = async (req, res, _) => {
  try {
    const industry = await Industry.destroy({
      where: { id: req.params.id },
    });
    return res.json(industry);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting industry.",
      description: error.message,
    });
  }
};

module.exports = {
  getIndustries,
  getIndustry,
  postIndustry,
  putIndustry,
  deleteIndustry,
  getActiveIndustries,
};
