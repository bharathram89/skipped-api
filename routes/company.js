const router = require("express").Router();

module.exports = (companyService) => {
  router.get("/", companyService.getCompanies);
  router.get("/find", companyService.findCompanies);
  router.post("/", companyService.postCompany);
  router.get("/:id", companyService.getCompany);
  router.put("/:id", companyService.putCompany);
  router.delete("/:id", companyService.deleteCompany);
  return router;
};
