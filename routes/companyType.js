const router = require("express").Router();

module.exports = (companyTypeService) => {
  router.get("/", companyTypeService.getCompaniesType);
  router.get("/find", companyTypeService.findCompaniesType);
  router.post("/", companyTypeService.postCompanyType);
  router.get("/:id", companyTypeService.getCompanyType);
  router.put("/:id", companyTypeService.putCompanyType);
  router.delete("/:id", companyTypeService.deleteCompanyType);
  return router;
};
