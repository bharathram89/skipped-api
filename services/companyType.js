const CompanyType = require("../models").CompanyType;

const getCompaniesType = async (req, res, _) => {
  try {
    const companyType = await CompanyType.findAll();
    return res.json(companyType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting companyType.",
      description: error.message,
    });
  }
};

const findCompaniesType = async (req, res, _) => {
  try {
    let companiesType;
    let query = req.query;
    if (query.status) {
      query.status = { [Op.like]: query.status };
    }
    companiesType = await CompanyType.findAll({
      where: query,
      order: [["updatedAt", "DESC"]],
      raw: true,
    });
    return res.json(companiesType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while searching companiesType.",
      description: error.message,
    });
  }
};

const getCompanyType = async (req, res, _) => {
  try {
    const companyType = await CompanyType.findOne({
      where: { id: req.params.id },
    });
    await CompanyType.upsert(companyType);
    return res.json(companyType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting companyType.",
      description: error.message,
    });
  }
};

const postCompanyType = async (req, res, _) => {
  try {
    delete req.body.id;
    const companyType = await CompanyType.create(req.body);
    return res.json(companyType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating companyType.",
      description: error.message,
    });
  }
};

const putCompanyType = async (req, res, _) => {
  try {
    const companyType = await CompanyType.findOne({
      where: { id: req.params.id },
    });
    if (!companyType) {
      return res.status(403).json({
        message: "Invalid companyType Id",
        description: "User is not authorized to update companyType.",
      });
    }
    const exp = await CompanyType.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating companyType.",
      description: error.message,
    });
  }
};

const deleteCompanyType = async (req, res, _) => {
  try {
    const companyType = await CompanyType.destroy({
      where: { id: req.params.id },
    });
    return res.json(companyType);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting companyType.",
      description: error.message,
    });
  }
};

module.exports = {
  getCompaniesType,
  getCompanyType,
  findCompaniesType,
  postCompanyType,
  putCompanyType,
  deleteCompanyType,
};
