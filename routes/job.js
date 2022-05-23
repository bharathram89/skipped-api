const router = require("express").Router();
const getProfile = require("../middlewares/getProfile");

module.exports = (jobService) => {
  router.get("/find", getProfile, jobService.findJobs);
  router.get("/", getProfile, jobService.getJobs);
  router.post("/", getProfile, jobService.postJob);
  router.get("/:id", getProfile, jobService.getJob);
  router.put("/:id", getProfile, jobService.putJob);
  router.delete("/:id", getProfile, jobService.deleteJob);
  return router;
};
