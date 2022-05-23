const Skill = require("../models").Skill;
const matchScoreUtil = require("../middlewares/matchScore");

const getSkills = async (req, res, _) => {
  try {
    const skills = await Skill.findAll();
    return res.json(skills);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting travelOption.",
      description: error.message,
    });
  }
};

const getSkillsTree = async (req, res, _) => {
  try {
    const skills = await matchScoreUtil.getSkillNest();
    return res.json(skills);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting skill tree.",
      description: error.message,
    });
  }
};

const getActiveSkill = async (req, res, _) => {
  try {
    const skills = await Skill.findAll({
      where: { status: "Active" },
    });
    return res.json(skills);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting skill.",
      description: error.message,
    });
  }
};

const getSkill = async (req, res, _) => {
  try {
    const skill = await Skill.findOne({
      where: { id: req.params.id },
    });
    await Skill.upsert(skill);
    return res.json(skill);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while getting skill.",
      description: error.message,
    });
  }
};

const postSkill = async (req, res, _) => {
  try {
    delete req.body.id;
    const skill = await Skill.create(req.body);
    return res.json(skill);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while creating skill.",
      description: error.message,
    });
  }
};

const putSkill = async (req, res, _) => {
  try {
    const skill = await Skill.findOne({
      where: { id: req.params.id },
    });
    if (!skill) {
      return res.status(403).json({
        message: "Invalid skill Id",
        description: "User is not authorized to update skill.",
      });
    }
    const exp = await Skill.upsert(req.body);
    return res.json(exp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while updating skill.",
      description: error.message,
    });
  }
};

const deleteSkill = async (req, res, _) => {
  try {
    const skill = await Skill.destroy({
      where: { id: req.params.id },
    });
    return res.json(skill);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error while deleting skill.",
      description: error.message,
    });
  }
};

module.exports = {
  getSkills,
  getSkillsTree,
  getActiveSkill,
  getSkill,
  postSkill,
  putSkill,
  deleteSkill,
};
