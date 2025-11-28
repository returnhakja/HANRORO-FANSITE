const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName,
  });
}

const bucket = admin.storage().bucket();

console.log("Firebase Storage 연결됨:", bucket.name);

module.exports = { bucket };
