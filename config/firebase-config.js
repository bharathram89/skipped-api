const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKeyDev.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;