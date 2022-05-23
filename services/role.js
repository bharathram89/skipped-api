
const Role = require('../models').Role;

const getRoles = async (req,res,_) => {
    try {
        const roles = await Role.findAll();
        return res.json(roles);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: "Error while fetching roles.", description: error.message});
    }    
}

const getRole = async (req,res,_) => {
    try {
        const role = await Role.findOne({ where: { id: req.params.id } });
        return res.json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: "Error while getting role.", description: error.message});
    }
    
}

const postRole = async (req,res,_) => {
    try {
        delete req.body.id;
        const role = await Role.create(req.body);
        return res.json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: "Error while creating role.", description: error.message});
    }
    
}

const putRole = async (req,res,_) => {
    try {
        const updatedRole = await Role.findOne({ where: { id: req.params.id} });
        if (!updatedRole) {
            return res.status(403).json({message: "Invalid role Id", description: "User is not authorized to update role."});
        }
        const role = await Role.upsert(req.body);
        return res.json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: "Error while updating role.", description: error.message});
    }
    
}

const deleteRole = async (req,res,_) => {
    try {
        const role = await Role.destroy({ where: { id: req.params.id} });
        return res.json(role);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: "Error while deleting role.", description: error.message});
    }
}

module.exports = {
    getRole,
    getRoles,
    postRole,
    putRole,
    deleteRole
};