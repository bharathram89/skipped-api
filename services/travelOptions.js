const TravelOption = require("../models").TravelOption;

const getTravelOptions = async (req, res, _) => {
  try {
    const TravelOptions = await TravelOption.findAll();
    return res.json(TravelOptions);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting travelOption.",
      description: error.message,
    });
  }
};

const getActiveTravelOptions = async (req, res, _) => {
  try {
    const TravelOptions = await TravelOption.findAll({
      where: { status: "Active" },
    });
    return res.json(TravelOptions);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting travelOption.",
      description: error.message,
    });
  }
};

const getTravelOption = async (req, res, _) => {
  try {
    const travelOption = await TravelOption.findOne({
      where: { id: req.params.id },
    });
    await TravelOption.upsert(travelOption);
    return res.json(travelOption);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting travelOption.",
      description: error.message,
    });
  }
};

const postTravelOption = async (req, res, _) => {
  try {
    delete req.body.id;
    const travelOption = await TravelOption.create(req.body);
    return res.json(travelOption);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating travelOption.",
      description: error.message,
    });
  }
};

const putTravelOption = async (req, res, _) => {
  try {
    const travelOption = await TravelOption.findOne({
      where: { id: req.params.id },
    });
    if (!travelOption) {
      return res.status(403).json({
        message: "Invalid travelOption Id",
        description: "User is not authorized to update travelOption.",
      });
    }
    const exp = await TravelOption.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating travelOption.",
      description: error.message,
    });
  }
};

const deleteTravelOption = async (req, res, _) => {
  try {
    const travelOption = await TravelOption.destroy({
      where: { id: req.params.id },
    });
    return res.json(travelOption);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting travelOption.",
      description: error.message,
    });
  }
};

module.exports = {
  getTravelOptions,
  getActiveTravelOptions,
  getTravelOption,
  postTravelOption,
  putTravelOption,
  deleteTravelOption,
};
