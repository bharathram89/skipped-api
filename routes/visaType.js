const router = require("express").Router();

module.exports = (visaTypeService) => {
  router.get("/", visaTypeService.getVisaTypes);
  router.get("/:status", visaTypeService.getActiveVisaTypes);
  router.post("/", visaTypeService.postVisaType);
  router.get("/:id", visaTypeService.getVisaType);
  router.put("/:id", visaTypeService.putVisaType);
  router.delete("/:id", visaTypeService.deleteVisaType);
  return router;
};
