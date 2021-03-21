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
let widget1, widget2, widget3;

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
  const widgetColl = await mongoose.connection.db.createCollection('widgets');
  widget1 = {
    name: 'test1',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-01-01T05:00:00',
  };
  widget2 = {
    name: 'test2',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-01-01T05:00:00',
  };
  await widgetColl.insertMany([widget1, widget2]);

  const calendarColl = await mongoose.connection.db.createCollection('calendarevents');
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
  await calendarColl.insertMany([event1, event2]);


});

afterEach(async () => {
  //await mongoose.connection.db.dropCollection('calendarevents');
  //await mongoose.connection.db.dropCollection('widgets');
  await mongoose.connection.db.dropDatabase();
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('Can post to create a new widget and receive widget data in response', async () => {

});

it('Can PUT to update position of widget', async () => {

});

it('Can delete a widget', async () => {

});

it('Can GET all widgets for a day, with all the widget data for the day', async () => {

});
