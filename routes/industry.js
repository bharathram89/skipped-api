const router = require("express").Router();

module.exports = (industryService) => {
  router.get("/", industryService.getIndustries);
  router.get("/:status", industryService.getActiveIndustries);
  router.post("/", industryService.postIndustry);
  router.get("/:id", industryService.getIndustry);
  router.put("/:id", industryService.putIndustry);
  router.delete("/:id", industryService.deleteIndustry);
  return router;
};
