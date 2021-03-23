const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const routes = require('../../src/routes');
const Habit = require('../../src/models/habit');

let mongod;
let app;
let server;
let habit1;
let habit2;
let habit3;
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
  const coll = await mongoose.connection.db.createCollection('habits');

  habit1 = {
    name: 'Test1',
    startDate: '2021-01-01', // This is a Friday
    endDate: '2021-01-08',
    daysOfWeek: ['mon', 'tue', 'fri'],
    completedDates: ['2021-01-01'],
  };

  // CompletedDates and endDate are optional fields
  habit2 = {
    name: 'Go gym',
    startDate: '2021-01-01', // This is a Friday
    daysOfWeek: ['mon', 'tue', 'thu'],
  };

  // Just using the optional endDate field
  habit3 = {
    name: 'Cry about 701',
    startDate: '2022-01-01', // This is a Saturday
    endDate: '2022-02-01',
    daysOfWeek: ['mon', 'tue', 'fri'],
  };

  await coll.insertMany([habit1, habit2, habit3]);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('habits');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

// Text is created through posting to the /api/journal endpoint.
it('Can post a habit with all fields', async () => {
  const body = {
    name: 'My habit',
    startDate: '2021-02-02', // This is a Tuesday
    endDate: '2021-03-02',
    daysOfWeek: ['mon', 'tue', 'fri'],
    completedDates: ['2021-01-01'],
  };
  const response = await axios.post(`http://localhost:${port}/api/habittracker`, body);
  const returnData = response.data;

  expect(returnData._id).toBeDefined();
  expect(returnData.name).toBe(body.name);
  // Returned will be with 'T00:00:00.000Z` appended, as stored as Date object in db
  expect(new Date(returnData.startDate)).toStrictEqual(new Date(body.startDate));
  expect(new Date(returnData.endDate)).toStrictEqual(new Date(body.endDate));
  expect(returnData.daysOfWeek).toStrictEqual(body.daysOfWeek);
  expect(returnData.completedDates.length).toBe(1);
  // For same reason above, we need to cast the body.completedDates values to include 'T00:00:00.00z'
  expect(new Date(returnData.completedDates[0])).toStrictEqual(new Date(body.completedDates[0]));

  // Response same as what is in database.
  const habitData = await Habit.findById(returnData._id);
  expect(returnData.name).toBe(habitData.name);
  expect(new Date(returnData.startDate)).toStrictEqual(new Date(habitData.startDate));
  expect(new Date(returnData.endDate)).toStrictEqual(new Date(habitData.endDate));
  // Comparing an Array to CoreMongooseArray, so cast to array via toObject()
  expect(returnData.daysOfWeek).toStrictEqual(habitData.daysOfWeek.toObject());
  expect(new Date(returnData.completedDates[0])).toStrictEqual(
    new Date(habitData.completedDates[0])
  );
});

it('Can post a habit with empty completedDates, and no endTime', async () => {
  const body = {
    name: 'My habit',
    startDate: '2021-02-02', // This is a Tuesday
    daysOfWeek: ['mon', 'tue', 'fri'],
    completedDates: [],
  };
  const response = await axios.post(`http://localhost:${port}/api/habittracker`, body);
  const returnData = response.data;

  expect(returnData._id).toBeDefined();
  expect(returnData.name).toBe(body.name);
  // Returned will be with 'T00:00:00.000Z` appended, as stored as Date object in db
  expect(new Date(returnData.startDate)).toStrictEqual(new Date(body.startDate));
  // Default undefined end date is new Date(8640000000000000), or '+275760-09-13T00:00:00.000Z'
  expect(new Date(returnData.endDate)).toStrictEqual(new Date(8640000000000000));
  expect(returnData.daysOfWeek).toStrictEqual(body.daysOfWeek);
  expect(returnData.completedDates.length).toBe(0);

  // Response same as what is in database.
  const habitData = await Habit.findById(returnData._id);
  expect(returnData.name).toBe(habitData.name);
  expect(new Date(returnData.startDate)).toStrictEqual(new Date(habitData.startDate));
  expect(new Date(returnData.endDate)).toStrictEqual(new Date(habitData.endDate));
  // Comparing an Array to CoreMongooseArray, so cast to array via toObject(). Should be empty.
  expect(returnData.daysOfWeek).toStrictEqual(habitData.daysOfWeek.toObject());
});

it('Can put to update a habit', async () => {
  let habitData = await Habit.findById(habit1._id);
  expect(habitData.name).toBe(habit1.name);
  expect(habitData.startDate).toStrictEqual(new Date(habit1.startDate));
  expect(habitData.endDate).toStrictEqual(new Date(habit1.endDate));
  expect(habitData.daysOfWeek.toObject()).toStrictEqual(habit1.daysOfWeek);
  expect(habitData.completedDates.length).toBe(1);

  // Same info as habit1, but with daysOfWeek and completedDates changed
  await axios.put(`http://localhost:${port}/api/habittracker/${habit1._id}`, {
    name: 'Test1',
    startDate: '2021-01-01',
    endDate: '2021-01-08',
    daysOfWeek: ['mon', 'tue', 'fri', 'sat', 'sun'],
    completedDates: ['2021-01-01', '2021-01-02'],
  });

  // Check the start/endDates and name are the same.
  habitData = await Habit.findById(habit1._id);
  expect(habitData.name).toBe(habit1.name);
  expect(habitData._id).toStrictEqual(habit1._id);
  expect(habitData.startDate).toStrictEqual(new Date(habit1.startDate));
  expect(habitData.endDate).toStrictEqual(new Date(habit1.endDate));

  // Different days of week and completedDates
  expect(habitData.daysOfWeek.toObject()).toStrictEqual(['mon', 'tue', 'fri', 'sat', 'sun']);
  expect(habitData.completedDates.length).toBe(2);
  expect(new Date(habitData.completedDates[0])).toStrictEqual(new Date(habit1.completedDates[0]));
  expect(new Date(habitData.completedDates[1])).toStrictEqual(new Date('2021-01-02T00:00:00.000Z'));
});

it('Can delete a habit', async () => {
  const habitsBeforeDelete = await Habit.find();
  expect(habitsBeforeDelete.length).toBe(3);

  await axios.delete(`http://localhost:${port}/api/habittracker/${habit1._id}`);
  const habitData = await Habit.find();

  expect(habitData.length).toBe(2);

  // Check habit2 is the same
  expect(habitData[0].name).toBe(habit2.name);
  expect(habitData[0]._id).toStrictEqual(habit2._id);

  // Check habit3 is the same
  expect(habitData[1].name).toBe(habit3.name);
  expect(habitData[1]._id).toStrictEqual(habit3._id);
});

it('GET not defined', async () => {
  let err;
  try {
    await axios.get(`http://localhost:${port}/api/habittracker`);
  } catch (error) {
    err = error;
  }
  expect(err).toBeDefined();
});
