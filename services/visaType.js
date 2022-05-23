const VisaType = require("../models").VisaType;

const getVisaTypes = async (req, res, _) => {
  try {
    const visaTypes = await VisaType.findAll();
    return res.json(visaTypes);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({
        message: "Error while fetching Visa types.",
        description: error.message,
      });
  }
};

const getActiveVisaTypes = async (req, res, _) => {
  try {
    const visaTypes = await VisaType.findAll({
      where: { status: "Active" },
    });
    return res.json(visaTypes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while fetching Visa types.",
      description: error.message,
    });
  }
};

const getVisaType = async (req, res, _) => {
  try {
    const visaType = await VisaType.findOne({ where: { id: req.params.id } });
    return res.json(visaType);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({
        message: "Error while getting visa type.",
        description: error.message,
      });
  }
};

const postVisaType = async (req, res, _) => {
  try {
    delete req.body.id;
    const visaType = await VisaType.create(req.body);
    return res.json(visaType);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({
        message: "Error while creating visa type.",
        description: error.message,
      });
  }
};

const putVisaType = async (req, res, _) => {
  try {
    const updatedVisaType = await VisaType.findOne({
      where: { id: req.params.id },
    });
    if (!updatedVisaType) {
      return res
        .status(403)
        .json({
          message: "Invalid visa type Id",
          description: "User is not authorized to update visa type.",
        });
    }
    const visaType = await VisaType.upsert(req.body);
    return res.json(visaType);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({
        message: "Error while updating visa type.",
        description: error.message,
      });
  }
};

const deleteVisaType = async (req, res, _) => {
  try {
    const visaType = await VisaType.destroy({ where: { id: req.params.id } });
    return res.json(visaType);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({
        message: "Error while deleting visa type.",
        description: error.message,
      });
  }
};

module.exports = {
  getVisaType,
  getVisaTypes,
  getActiveVisaTypes,
  postVisaType,
  putVisaType,
  deleteVisaType,
};
