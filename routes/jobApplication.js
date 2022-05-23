const router = require("express").Router();
const getProfile = require("../middlewares/getProfile");

module.exports = (jobApplicationService) => {
    router.get('/', getProfile, jobApplicationService.getJobApplications);
    router.post('/', getProfile, jobApplicationService.postJobApplication);
    router.get('/:id', getProfile, jobApplicationService.getJobApplication);
    router.put('/:id', getProfile, jobApplicationService.putJobApplication);
    router.delete('/:id', getProfile, jobApplicationService.deleteJobApplication);
    return router;
};