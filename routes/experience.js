const router = require("express").Router();

module.exports = (experienceService) => {
  router.get("/", experienceService.getExperiences);
  router.get("/:status", experienceService.getActiveExperiences);
  router.post("/", experienceService.postExperience);
  router.get("/:id", experienceService.getExperience);
  router.put("/:id", experienceService.putExperience);
  router.delete("/:id", experienceService.deleteExperience);
  return router;
};
