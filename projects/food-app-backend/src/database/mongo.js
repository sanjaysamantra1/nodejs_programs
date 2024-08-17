const mongoose = require("mongoose");
const path = require("path");

const credentials = path.resolve(__dirname, process.env.CERT_PATH);

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      authMechanism: "MONGODB-X509",
      appName: "workspace",
      tlsCertificateKeyFile: credentials,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw new Error("Error disconnecting from MongoDB");
  }
}

function getCollection(collectionName) {
  return mongoose.connection.db.collection(collectionName);
}

module.exports = { connect, disconnect, getCollection };
