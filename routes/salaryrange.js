const router = require("express").Router();

module.exports = (salaryRangeService) => {
  router.get("/", salaryRangeService.getSalaryRanges);
  router.post("/", salaryRangeService.postSalaryRange);
  router.get("/:id", salaryRangeService.getSalaryRange);
  router.put("/:id", salaryRangeService.putSalaryRange);
  router.delete("/:id", salaryRangeService.deleteSalaryRange);
  return router;
};
