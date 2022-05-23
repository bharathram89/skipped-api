const Profile = require('../models').Profile;

const getProfile = async (req, res, next) => {
    try {
        if (!req.headers["profileid"]) {
            return res.status(403).json({ message: "ProfileId is required.", description: "Missing profile Id in headers" });
        }
        const profile = await Profile.findOne({
            where: {
                id: req.headers["profileid"],
                userId: req.body.user.uid
            },
            raw: true
        });
        if (!profile) {
            return res.status(403).json({ message: "Profile Id is invalid.", description: "Profile Id is not valid" });
        }
        req.body.profile = profile;
        return next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error while getting profile.", description: error.message });
    }
}

module.exports = getProfile;