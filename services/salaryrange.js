const SalaryRange = require("../models").SalaryRange;

const getSalaryRanges = async (req, res, _) => {
  try {
    const salaryRanges = await SalaryRange.findAll();
    return res.json(salaryRanges);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting salaryRange.",
      description: error.message,
    });
  }
};

const getSalaryRange = async (req, res, _) => {
  try {
    const salaryRange = await SalaryRange.findOne({
      where: { id: req.params.id },
    });
    await SalaryRange.upsert(salaryRange);
    return res.json(salaryRange);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting salaryRange.",
      description: error.message,
    });
  }
};

const postSalaryRange = async (req, res, _) => {
  try {
    delete req.body.id;
    const salaryRange = await SalaryRange.create(req.body);
    return res.json(salaryRange);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating salaryRange.",
      description: error.message,
    });
  }
};

const putSalaryRange = async (req, res, _) => {
  try {
    const salaryRange = await SalaryRange.findOne({
      where: { id: req.params.id },
    });
    if (!salaryRange) {
      return res.status(403).json({
        message: "Invalid salaryRange Id",
        description: "User is not authorized to update salaryRange.",
      });
    }
    const salary = await SalaryRange.upsert(req.body);
    return res.json(salary);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating salaryRange.",
      description: error.message,
    });
  }
};

const deleteSalaryRange = async (req, res, _) => {
  try {
    const salaryRange = await SalaryRange.destroy({
      where: { id: req.params.id },
    });
    return res.json(salaryRange);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting salaryRange.",
      description: error.message,
    });
  }
};

module.exports = {
  getSalaryRanges,
  getSalaryRange,
  postSalaryRange,
  putSalaryRange,
  deleteSalaryRange,
};
