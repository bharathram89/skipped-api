const router = require("express").Router();

module.exports = (roleService) => {
    router.get('/', roleService.getRoles);
    router.post('/', roleService.postRole);
    router.get('/:id', roleService.getRole);
    router.put('/:id', roleService.putRole);
    router.delete('/:id', roleService.deleteRole);
    return router;
};