const router = require("express").Router();
const getProfile = require("../middlewares/getProfile");

module.exports = (matchScoreService) => {
  router.get("/", getProfile, matchScoreService.getMatchScores);
  router.post("/", getProfile, matchScoreService.postMatchScore);
  router.get("/:id", getProfile, matchScoreService.getMatchScore);
  router.put("/:id", getProfile, matchScoreService.putMatchScore);
  router.delete("/:id", getProfile, matchScoreService.deleteMatchScore);
  return router;
};
