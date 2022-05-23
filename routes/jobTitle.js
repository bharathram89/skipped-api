const router = require("express").Router();

module.exports = (jobTitleService) => {
  router.get("/", jobTitleService.getjobTitles);
  router.get("/:status", jobTitleService.getActiveJobTitles);
  router.post("/", jobTitleService.postJobTitle);
  router.get("/:id", jobTitleService.getJobTitle);
  router.put("/:id", jobTitleService.putJobTitle);
  router.delete("/:id", jobTitleService.deleteJobTitle);
  return router;
};
