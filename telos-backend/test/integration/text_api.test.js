const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const routes = require('../../src/routes');
const Text = require('../../src/models/text');

let mongod;
let app;
let server;
let text1;
let text2;
let text3;
let port;

beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  const connectionString = await mongod.getUri();
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(express.json());
  app.use('/', routes);
  server = app.listen(0, () => {
    port = server.address().port;
    done();
  });
});

beforeEach(async () => {
  const coll = await mongoose.connection.db.createCollection('texts');

  text1 = {
    text: 'first lorem ipsum',
    widgetId: 'abcdee6a0ba62570afcedd3a',
  };

  text2 = {
    text: 'second lorem ipsum',
    widgetId: 'abcdef6a0ba62570afcedd3a',
  };

  text3 = {
    text: 'third lorem ipsum',
    widgetId: 'abcdee6a0ba62570afcedd3a',
  };

  await coll.insertMany([text1, text2, text3]);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('texts');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

// Text is created through posting to the /api/journal endpoint.
it('can post a text instance', async () => {
  const body = {
    date: '2021-01-01',
    position: {
      row: 2,
      col: 2,
    },
    type: 'text',
  };
  const response = await axios.post(`http://localhost:${port}/api/journal`, body);
  const returnData = response.data;

  expect(returnData.data[0]._id).toBeDefined();
  expect(returnData.data[0].text).toBe('');
  expect(returnData.data[0].widgetId).toBe(returnData.widget._id);

  // Response same as what is in database.
  const textData = await Text.findById(returnData.data[0]._id);
  expect(returnData.data[0].text).toBe(textData.text);
  expect(returnData.data[0].widgetId).toBe(textData.widgetId.toString());
});

it('Can put text to update it', async () => {
  await axios.put(`http://localhost:${port}/api/text/${text1._id}`, {
    _id: text1._id,
    text: 'changed lorem ipsum',
    widgetId: 'abcdee6a0ba62570afcedd3a',
  });

  // Check 1 field changes, others stay the same.
  const textData = await Text.findById(text1._id);
  expect(textData.text).toBe('changed lorem ipsum');

  expect(textData._id).toStrictEqual(text1._id);
  expect(textData.widgetId.toString()).toBe(text1.widgetId);
});

it('can delete a thing', async () => {
  const textBeforeDelete = await Text.find();
  expect(textBeforeDelete.length).toBe(3);

  await axios.delete(`http://localhost:${port}/api/text/${text1._id}`);
  const textData = await Text.find();

  expect(textData.length).toBe(2);

  // Check event2 is the same
  expect(textData[0].text).toBe(text2.text);
  expect(textData[0]._id).toStrictEqual(text2._id);
  expect(textData[0].widgetId.toString()).toBe(text2.widgetId);

  // Check event3 is the same
  expect(textData[1].text).toBe(text3.text);
  expect(textData[1]._id).toStrictEqual(text3._id);
  expect(textData[1].widgetId.toString()).toBe(text3.widgetId);
});

it('GET not defined', async () => {
  let err;
  try {
    await axios.get(`http://localhost:${port}/api/text`);
  } catch (error) {
    err = error;
  }
  expect(err).toBeDefined();
});
