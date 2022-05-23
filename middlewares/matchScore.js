const JobProfileScore = require('../models').JobProfileScore;
const MatchScore = require('../models').MatchScore;
const Job = require('../models').Job;
const Skill = require('../models').Skill;
const Profile = require('../models').Profile;
const constants = require("../utils/constants").constants;
const Op = require("sequelize").Op;

let defaultMatchScore;
let skillNest;
let skillFlat;
let skillNestUpdatedAt;

function list_to_tree(list) {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i++) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i++) {
        node = list[i];
        if (node.parentId !== "0") {
            // if you have dangling branches check that map[node.parentId] exists
            if(list[map[node.parentId]]) {
                list[map[node.parentId]].children.push(node);
            }
        } else {
            roots.push(node);
        }
    }
    return roots;
}

function add_level_to_tree(list, level) {
    for (let i = 0; i <= list.length - 1; i++) {
        list[i].level = level;
    }
    level++;
    for (let i = 0; i <= list.length - 1; i++) {
        addLevelToList(list[i].children, level);
    }
}

const getSkillNest = async () => {
    try {
        const updatedSkills = await Skill.findAll({
            where: { updatedAt: { [Op.gte]: skillNestUpdatedAt } },
        });
        if (!skillNest || !skillNestUpdatedAt || updatedSkills.length > 0) {
            const skills = await Skill.findAll({
                where: { status: "Active" }, // Note: build heirarchy of only active skills
            });
            skillNest = list_to_tree(skills);
            add_level_to_tree(skillNest, 0);
            skillFlat = flatObj(skillNest);
            skillNestUpdatedAt = new Date();
        }
        return { skills: skillNest, updatedAt: skillNestUpdatedAt };
    } catch (error) {
        console.error(`Error while nesting skill json: ${error.message}`);
    }
}


const getNodeIds = (list, ids) => {
    for (let i = 0; i <= list.length - 1; i++) {
        ids.push(list[i].id);
        getNodeIds(list[i].children, ids);
    }
    return ids;
}

const isChild = (list, id, ids, node) => {
    for (let i = 0; i <= list.length - 1; i++) {
        if (list[i].id == id) {
            node = list[i].children;
        }
        isChild(list[i].children, id, ids, node);
    }
    if (node) {
        ids = getNodeIds(node, []);
        return ids;
    }
    return [];
}

const flatObj = (data, arr) => {
    for (let i = 0; i <= data.length - 1; i++) {
        let children = [...data[i].children];

        delete data[i].children;
        console.log(data[i]);
        arr.push(data[i]);
        flatObj(children, arr);
    }
    return arr;
}

const getParent = (list, id, ids) => {
    if (id == null) { return ids; }
    for (let i = 0; i <= list.length - 1; i++) {
        if (list[i].id == id) {
            ids.push(list[i]);
            getParent(list, list[i].parentId, ids);
        }
    }
    return ids;
}

const containsChildSkill = (skillTree, jobSkillId, profile) => {
    const childIds = isChild(skillTree, jobSkillId, null, null);
    profile.forEach(profileSkill => {
        if (profileSkill == childIds) {
            return true;
        }
    });
    return false;
}

const calculateSkillScore = async (job, profile, skillCount) => {
    let count = 0;
    let jobCount = 100 / job.length;
    let skillTree = await getSkillNest();
    skillTree = skillTree.skills;
    job.forEach(jobSkillId => {
        if (profile.includes(jobSkillId) || containsChildSkill(skillTree, jobSkillId, profile)) {
            count += jobCount;
        } else {
            let parentSkills = getParent(skillFlat, jobSkillId, []);
            let countLevel = 0;
            let currentSkill = parentSkills.filter(skill => skill.id == jobSkillId);
            parentSkills = parentSkills.filter(skill => skill.id != jobSkillId);
            profile.forEach(profileSkill => {
                parentSkills.forEach(parentSkill => {
                    if(profileSkill.id == parentSkill.id) {
                        if(((parentSkill.level+1)/(currentSkill.level+1)) > countLevel ) {
                            countLevel = (parentSkill.level+1)/(currentSkill.level+1);
                        }
                    }
                });
            });
            count += jobCount * countLevel;
        }
    });
    return skillCount * count / 100;
}

const deleteProfileScore = async (id) => {
    try {
        await JobProfileScore.destroy({
            where: { profileId: id },
        });
    } catch (error) {
        console.error(`Error while deleting profile score: ${error.message}`);
    }
}

const updateProfileScore = async (profileId) => {
    try {
        let profile = await Profile.findOne({
            where: { id: profileId },
        });
        await deleteProfileScore(profileId);
        let jobs = await Job.findAll({
            offset: 0, limit: 1000, raw: true,
        });
        let count = 0;
        while (jobs.length > 0) {
            jobs.forEach(async job => {
                const matchScore = await MatchScore.findOne({
                    where: { profileId: job.createdBy },
                    raw: true,
                });
                await processJobProfileScore(profile, job, matchScore);
            });
            if (jobs.length == 1000) {
                count += 1000;
                jobs = await Job.findAll({
                    offset: count, limit: 1000, raw: true,
                });
            } else {
                jobs = [];
            }
        }
    } catch (error) {
        console.error(`Error while updating profile score: ${error.message}`);
    }
}

const deleteJobScore = async (id) => {
    try {
        JobProfileScore.destroy({
            where: { jobId: id },
        });
    } catch (error) {
        console.error(`Error while deleting job score: ${error.message}`);
    }
}

const countJobScore = async (job, profile, compare, skillCount, param) => {
    let jobArr = job.toString().split(",");
    let profileArr = profile.toString().split(",");
    let count = 0;

    if (param === 'rw') {
        return skillCount;
    } else if (param === 'ps' || param === 'ss') {
        return await calculateSkillScore(jobArr, profileArr, skillCount);
    } else {
        profileArr.forEach(p => {
            if (jobArr.includes(p)) {
                count++;
            }
        });
    }

    if (compare) {
        const pPer = count / jobArr.length;
        return skillCount * pPer;
    } else {
        if (count > 0) {
            return skillCount
        } else {
            return 0;
        }
    }
}

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
}


const updateJobScore = async (jobId) => {
    try {
        let job = await Job.findOne({
            where: { id: jobId },
        });
        await deleteJobScore(jobId);
        let profiles = await Profile.findAll({
            where: { roleTag: constants.ROLE_TAGS.CANDIDATE },
            offset: 0, limit: 1000, raw: true,
        });
        let matchScore = await MatchScore.findOne({
            where: { profileId: job.createdBy },
            raw: true,
        });
        let count = 0;
        while (profiles.length > 0) {
            profiles.forEach(async profile => {
                await processJobProfileScore(profile, job, matchScore);
            });
            if (profiles.length == 1000) {
                count += 1000;
                profiles = await Profile.findAll({
                    where: { roleTag: constants.ROLE_TAGS.CANDIDATE },
                    offset: count, limit: 1000, raw: true,
                });
            } else {
                profiles = [];
            }
        }
    } catch (error) {
        console.error(`Error while updating job score: ${error.message}`);
    }
}

const processJobProfileScore = async (profile, job, matchScore) => {
    try {
        if (!matchScore) {
            if (!defaultMatchScore) {
                defaultMatchScore = await MatchScore.findOne({
                    where: { profileId: constants.DEFAULT },
                    raw: true,
                });
            }
            matchScore = defaultMatchScore;
        }
        let score = {
            jobId: job.id,
            profileId: profile.id,
            score: 0,
        }
        if (job.primarySkills && profile.primarySkillIds) {
            score.score += await countJobScore(job.primarySkills, profile.primarySkillIds, true, matchScore.primarySkill, 'ps');
        }
        if (job.secondarySkills && profile.secondarySkillIds) {
            score.score += await countJobScore(job.secondarySkills, profile.secondarySkillIds, true, matchScore.secondarySkill, 'ss');
        }
        if (job.industryIds && profile.industryIds) {
            score.score += await countJobScore(job.industryIds, profile.industryIds, true, matchScore.industry, 'in');
        }
        if (job.visaIds && profile.visaIds) {
            score.score += await countJobScore(job.visaIds, profile.visaIds, true, matchScore.visaType, 'vt');
        }
        if (job.totalExperienceIds && profile.totalExperience) {
            score.score += await countJobScore(job.totalExperienceIds, profile.totalExperience, false, matchScore.experiance, 'te');
        }
        if (job.salaryRangeIds && profile.salaryRangeId) {
            score.score += await countJobScore(job.salaryRangeIds, profile.salaryRangeId, false, matchScore.salary, 'sa');
        }
        if (job.jobTitleIds && profile.jobTitleId) {
            score.score += await countJobScore(job.jobTitleIds, profile.jobTitleId, false, matchScore.jobTitle, 'jt');
        }
        if ((job.remote === true) && (profile.remote === 1)) {
            score.score += await countJobScore(job.remote, profile.remote, false, matchScore.remoteWork, 'rw');
        }
        if (job.location && profile.location) {
            let jLL = job.location.split(",");
            let pLL = profile.location.split(",");
            let distKM = getDistanceFromLatLonInKm(jLL[0], jLL[1], pLL[0], pLL[1]);
            let dPer = 0;
            if (distKM < 30) {
                dPer = 1;
            } else if (distKM < 50) {
                dPer = 0.75;;
            } else if (distKM < 100) {
                dPer = 0.5;
            }
            score.score += matchScore.location * dPer;
        }
        if (job.preferredEducationIds && profile.educationId) {
            score.score += await countJobScore(job.preferredEducationIds, profile.educationId, false, matchScore.education, 'ed');
        }

        if (score.score >= 50) {
            await JobProfileScore.create(score);
        }
    } catch (error) {
        console.error(`Error while updating job score: ${error.message}`);
    }
}

module.exports = {
    updateProfileScore,
    updateJobScore,
    deleteProfileScore,
    deleteJobScore,
    getSkillNest
};