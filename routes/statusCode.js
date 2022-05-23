const router = require("express").Router();

module.exports = (statusCodeService) => {
  router.get("/", statusCodeService.getStatusCodes);
  router.post("/", statusCodeService.postStatusCode);
  router.get("/:id", statusCodeService.getStatusCode);
  router.put("/:id", statusCodeService.putStatusCode);
  router.delete("/:id", statusCodeService.deleteStatusCode);
  return router;
};
