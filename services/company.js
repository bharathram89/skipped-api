const Company = require("../models").Company;

const getCompanies = async (req, res, _) => {
  try {
    const company = await Company.findAll();
    return res.json(company);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting company.",
      description: error.message,
    });
  }
};

const findCompanies = async (req, res, _) => {
  try {
    let companies;
    let query = req.query;
    if (query.status) {
      query.status = { [Op.like]: query.status };
    }
    companies = await Company.findAll({
      where: query,
      order: [["updatedAt", "DESC"]],
      raw: true,
    });    
    return res.json(companies);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while searching companies.",
      description: error.message,
    });
  }
};

const getCompany = async (req, res, _) => {
  try {
    const company = await Company.findOne({
      where: { id: req.params.id },
    });
    await Company.upsert(company);
    return res.json(company);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting company.",
      description: error.message,
    });
  }
};

const postCompany = async (req, res, _) => {
  try {
    delete req.body.id;
    const company = await Company.create(req.body);
    return res.json(company);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating company.",
      description: error.message,
    });
  }
};

const putCompany = async (req, res, _) => {
  try {
    const company = await Company.findOne({
      where: { id: req.params.id },
    });
    if (!company) {
      return res.status(403).json({
        message: "Invalid company Id",
        description: "User is not authorized to update company.",
      });
    }
    const exp = await Company.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating company.",
      description: error.message,
    });
  }
};

const deleteCompany = async (req, res, _) => {
  try {
    const company = await Company.destroy({
      where: { id: req.params.id },
    });
    return res.json(company);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting company.",
      description: error.message,
    });
  }
};

module.exports = {
  getCompanies,
  getCompany,
  findCompanies,
  postCompany,
  putCompany,
  deleteCompany,
};
