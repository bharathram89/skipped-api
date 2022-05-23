const router = require("express").Router();

module.exports = (educationService) => {
  router.get("/", educationService.getEducations);
  router.get("/:status", educationService.getActiveEducations);
  router.post("/", educationService.postEducation);
  router.get("/:id", educationService.getEducation);
  router.put("/:id", educationService.putEducation);
  router.delete("/:id", educationService.deleteEducation);
  return router;
};
