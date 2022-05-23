const router = require("express").Router();

module.exports = (internshipDurationService) => {
  router.get("/", internshipDurationService.getInternshipDurations);
  router.get(
    "/:status",
    internshipDurationService.getActiveInternshipDurations
  );
  router.post("/", internshipDurationService.postInternshipDuration);
  router.get("/:id", internshipDurationService.getInternshipDuration);
  router.put("/:id", internshipDurationService.putInternshipDuration);
  router.delete("/:id", internshipDurationService.deleteInternshipDuration);
  return router;
};
