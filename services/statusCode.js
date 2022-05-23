const StatusCode = require("../models").StatusCode;

const getStatusCodes = async (req, res, _) => {
  try {
    const statusCode = await StatusCode.findAll();
    return res.json(statusCode);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting statusCode.",
      description: error.message,
    });
  }
};

const getActiveStatusCode = async (req, res, _) => {
  try {
    const statusCode = await StatusCode.findAll({
      where: { status: "Active" },
    });
    return res.json(statusCode);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting statusCode.",
      description: error.message,
    });
  }
};

const getStatusCode = async (req, res, _) => {
  try {
    const statusCode = await StatusCode.findOne({
      where: { id: req.params.id },
    });
    await StatusCode.upsert(statusCode);
    return res.json(statusCode);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting statusCode.",
      description: error.message,
    });
  }
};

const postStatusCode = async (req, res, _) => {
  try {
    delete req.body.id;
    const statusCode = await StatusCode.create(req.body);
    return res.json(statusCode);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating statusCode.",
      description: error.message,
    });
  }
};

const putStatusCode = async (req, res, _) => {
  try {
    const statusCode = await StatusCode.findOne({
      where: { id: req.params.id },
    });
    if (!statusCode) {
      return res.status(403).json({
        message: "Invalid statusCode Id",
        description: "User is not authorized to update statusCode.",
      });
    }
    const exp = await StatusCode.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating statusCode.",
      description: error.message,
    });
  }
};

const deleteStatusCode = async (req, res, _) => {
  try {
    const statusCode = await StatusCode.destroy({
      where: { id: req.params.id },
    });
    return res.json(statusCode);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting statusCode.",
      description: error.message,
    });
  }
};

module.exports = {
  getStatusCodes,
  getActiveStatusCode,
  getStatusCode,
  postStatusCode,
  putStatusCode,
  deleteStatusCode,
};
