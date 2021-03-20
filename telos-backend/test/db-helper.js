/* eslint-disable no-await-in-loop, no-restricted-syntax, guard-for-in */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoProcess = new MongoMemoryServer();

// Connect to the in-memory database. When requiring this file, a process will already
// have started. Ensure to disconnect using closeDb.
module.exports.connectToDb = async () => {
  const uri = await mongoProcess.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Drop all mongoose connections, then stop the running process.
// Use to clean up after all tests.
module.exports.closeDb = async () => {
  await mongoose.disconnect();
  await mongoProcess.stop();
};

// Wipe data from db without disconnecting/ending the process.
module.exports.clearDb = async () => {
  const allCollections = mongoose.connection.collections;
  for (const index in allCollections) {
    const collection = allCollections[index];
    await collection.deleteMany();
  }
};
