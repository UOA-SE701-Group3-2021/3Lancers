const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const routes = require('../../src/routes');
const CalendarEvent = require('../../src/models/calendar_event');

let mongod;
let app;
let server;
let event1;
let event2;
let event3;
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

beforeEach(async () => {
  const coll = await mongoose.connection.db.createCollection('calendarevents');

  event1 = {
    name: 'test1',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-01-01T05:00:00',
  };

  event2 = {
    name: 'test2',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-01-01T05:00:00',
  };

  event3 = {
    name: 'test3',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-01-01T05:00:00',
  };

  await coll.insertMany([event1, event2, event3]);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('calendarevents');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('Can post a calendar event', async () => {
  const body = {
    name: 'Test calendar',
    startTime: '2021-01-01T02:00:00',
    endTime: '2021-01-01T05:00:00',
  };
  const response = await axios.post(`http://localhost:${port}/api/calendar`, body);
  const returnEvent = response.data;

  expect(returnEvent._id).toBeDefined();
  expect(new Date(returnEvent.startTime)).toStrictEqual(new Date(body.startTime));

  // Response same as what is in database.
  const calEvent = await CalendarEvent.findById(returnEvent._id);
  expect(new Date(returnEvent.startTime)).toStrictEqual(calEvent.startTime);
  expect(new Date(returnEvent.endTime)).toStrictEqual(calEvent.endTime);
  expect(returnEvent.name).toBe(calEvent.name);
});

it('Can put a calendar event to update it', async () => {
  await axios.put(`http://localhost:${port}/api/calendar/${event1._id}`, {
    _id: event1._id,
    name: 'Updated test1',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-01-01T06:00:00',
  });

  // Check 1 remains same, others change.
  const calEvent = await CalendarEvent.findById(event1._id);
  expect(calEvent.name).toBe('Updated test1');

  expect(calEvent.startTime).toStrictEqual(new Date('2021-01-01T00:00:00'));
  expect(calEvent.endTime).toStrictEqual(new Date('2021-01-01T06:00:00'));
});

it('can delete a thing', async () => {
  const calEventsBeforeDelete = await CalendarEvent.find();
  expect(calEventsBeforeDelete.length).toBe(3);

  await axios.delete(`http://localhost:${port}/api/calendar/${event1._id}`);
  const calEvents = await CalendarEvent.find();

  expect(calEvents.length).toBe(2);

  // Check event2 is the same
  expect(new Date(event2.startTime)).toStrictEqual(calEvents[0].startTime);
  expect(new Date(event2.endTime)).toStrictEqual(calEvents[0].endTime);
  expect(calEvents[0].name).toBe(event2.name);
  expect(calEvents[0]._id).toStrictEqual(event2._id);

  // Check event3 is the same
  expect(new Date(event3.startTime)).toStrictEqual(calEvents[1].startTime);
  expect(new Date(event3.endTime)).toStrictEqual(calEvents[1].endTime);
  expect(calEvents[1].name).toBe(event3.name);
  expect(calEvents[1]._id).toStrictEqual(event3._id);
});

it('GET not defined', async () => {
  let err;
  try {
    await axios.get(`http://localhost:${port}/api/calendar`);
  } catch (error) {
    err = error;
  }
  expect(err).toBeDefined();
});
