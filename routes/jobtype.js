const router = require("express").Router();

module.exports = (jobtypeService) => {
  router.get("/", jobtypeService.getJobTypes);
  router.get("/:status", jobtypeService.getActiveJobTypes);
  router.post("/", jobtypeService.postJobType);
  router.get("/:id", jobtypeService.getJobType);
  router.put("/:id", jobtypeService.putJobTypes);
  router.delete("/:id", jobtypeService.deleteJobType);
  return router;
};
