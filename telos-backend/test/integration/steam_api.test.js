const { MongoMemoryServer } = require('mongodb-memory-server');
const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../../src/routes');

let mongod;
let app;
let server;
let port;

beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  const connectionString = await mongod.getUri();
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app = express();
  app.use(express.json());
  app.use('/', routes);
  server = app.listen(0, () => {
    port = server.address().port;
    done();
  });
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('Can ping the steam endpoint', async () => {
  const res = await axios.get(`http://localhost:${port}/api/steam/ping`);
  expect(res.status).toBe(200);
});
