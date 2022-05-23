const router = require("express").Router();

module.exports = (skillsService) => {
  router.get("/", skillsService.getSkills);
  router.get("/tree", skillsService.getSkillsTree);
  router.get("/:status", skillsService.getActiveSkill);
  router.post("/", skillsService.postSkill);
  router.get("/:id", skillsService.getSkill);
  router.put("/:id", skillsService.putSkill);
  router.delete("/:id", skillsService.deleteSkill);
  return router;
};
