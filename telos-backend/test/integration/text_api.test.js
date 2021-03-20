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
  server = app.listen(3000, () => done());
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

it('can post a text instance', async () => {
  const body = {
    text: 'test lorem ipsum',
    widgetId: 'abcd1e6a0ba62570afcedd3a',
  };
  const response = await axios.post('http://localhost:3000/api/text', body);
  const returnData = response.data;

  expect(returnData._id).toBeDefined();
  expect(returnData.text).toBe(body.text);
  expect(returnData.widgetId).toBe(body.widgetId);

  // Response same as what is in database.
  const textData = await Text.findById(returnData._id);
  expect(returnData.text).toBe(textData.text);
  expect(returnData.widgetId).toBe(textData.widgetId.toString());
});

it('Can put text to update it', async () => {
  await axios.put(`http://localhost:3000/api/text/${text1._id}`, {
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

  await axios.delete(`http://localhost:3000/api/text/${text1._id}`);
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
    await axios.get('http://localhost:3000/api/text');
  } catch (error) {
    err = error;
  }
  expect(err).toBeDefined();
});
