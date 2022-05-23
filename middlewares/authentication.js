const admin = require("../config/firebase-config")

authenticate = async function (req, res, next) {
    try {
        if (req.headers["authorization"]) {
            const token = req.headers["authorization"].split(' ')[1];
            const decodeVal = await admin.auth().verifyIdToken(token);
            if (decodeVal) {
                req.body.user = decodeVal;
                return next();
            }
        }        
        return res.status(401).send("Unauthorized user.");
    } catch (error) {
        console.error("Error while authenticating user", error.message)
        return res.status(500).send({ message: "Internal server error while authenticating user.", description: error.message});
    }
    
}

module.exports = authenticate;