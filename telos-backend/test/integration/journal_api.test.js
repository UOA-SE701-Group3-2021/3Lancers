const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const routes = require('../../src/routes');
const CalendarEvent = require('../../src/models/calendar_event');
const Text = require('../../src/models/text');
const Widget = require('../../src/models/widget');
const Habit = require('../../src/models/habit');
const Todo = require('../../src/models/todo_task');

let mongod;
let app;
let server;
let event1;
let event2;
let widget1, widget2, widget3;
let habit1, habit2;
let text1, text2;
let todo1, todo2;
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
  //const widgetColl = await mongoose.connection.db.createCollection('widgets');
  widget1 = {
    date: '2021-01-01',
    position: {
        row: 2,
        col: 2,
    },
    type: 'habit_tracker'
  };
  widget2 = {
    date: '2021-01-01',
    position: {
        row: 2,
        col: 3,
    },
    type: 'todo'
  };
  widget3 = {
    date: '2021-02-03',
    position: {
        row: 2,
        col: 3,
    },
    type: 'text'
  };
  // Note: Doing this way because of how times are saved.
  // When .save(), converts auto to UTC. This is the way we intend it to worl
  const newWidget1 = new Widget(widget1)
  await newWidget1.save()
  const newWidget2 = new Widget(widget2)
  await newWidget2.save()
  const newWidget3 = new Widget(widget3)
  await newWidget3.save()
 // await widgetColl.insertMany([widget1, widget2, widget3]);

  //const calendarColl = await mongoose.connection.db.createCollection('calendarevents');
  event1 = {
    name: 'test1',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-01-01T05:00:00',
  };
  event2 = {
    name: 'test2',
    startTime: '2020-12-31T00:00:00',
    endTime: '2020-12-31T05:00:00',
  };
  
  const newEvent1 = new CalendarEvent(event1)
  await newEvent1.save()
  const newEvent2 = new CalendarEvent(event2)
  await newEvent2.save()
  //await calendarColl.insertMany([event1, event2]);

  //const habitColl = await mongoose.connection.db.createCollection('habits');
  habit1 = {
    name: 'test1',
    startDate: '2021-01-01', // This is a Friday
    endDate: '2021-01-08',
    daysOfWeek: ['mon', 'tue', 'fri'],
    completedDates: ['2021-01-01'],
  };
  habit2 = {
    name: 'Go gym',
    startDate: '2021-01-01', // This is a Friday
    daysOfWeek: ['mon', 'tue', 'thu'],
  };

  const newHabit1 = new Habit(habit1)
  await newHabit1.save()
  const newHabit2 = new Habit(habit2)
  await newHabit2.save()
  //await habitColl.insertMany([habit1, habit2]);

  //const textWidget = await Widget.find({type: 'text'})
  //const textColl = await mongoose.connection.db.createCollection('texts');
  text1 = {
    text: 'text1',
    widgetId: newWidget3._id // maybe just widget3._id
  };
  const newText1 = new Text(text1)
  await newText1.save()
  //await textColl.insertMany([text1]);

  //const todoColl = await mongoose.connection.db.createCollection('todo_tasks');
  todo1 = {
    name: 'test1',
    createdDate: '2021-01-01',
    dueDate: '2021-01-01',
    completed: true
  };
  todo2 = {
    name: 'test2',
    createdDate: '2020-01-01',
    dueDate: '2021-01-01',
    completed: false
  };
  todo3 = {
    name: 'test3',
    createdDate: '2021-01-01',
    dueDate: '2023-01-01',
    completed: true
  };
  todo4 = {
    name: 'test3',
    createdDate: '2020-01-01',
    dueDate: '2023-01-01',
    completed: false
  };
  const newTodo1 = new Todo(todo1)
  await newTodo1.save()
  const newTodo2 = new Todo(todo2)
  await newTodo2.save()
  const newTodo3 = new Todo(todo3)
  await newTodo3.save()
  const newTodo4 = new Todo(todo4)
  await newTodo4.save()
  //await todoColl.insertMany([todo1, todo2]);
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
// Post for text
// delete for text
it('Can post to create a new widget and receive widget data in response', async () => {
    const body = {
        date: '2021-01-01',
        position: {
            row: 1,
            col: 1,
        },
        type: 'calendar'
      };
    const response = await axios.post(`http://localhost:${port}/api/journal`, body);
    const returnData = response.data;
    //console.log(returnData)
    // calevents = await CalendarEvent.find()
    // console.log(calevents)
    
    //   expect(returnEvent._id).toBeDefined();
    //   expect(new Date(returnEvent.startTime)).toStrictEqual(new Date(body.startTime));
    
    //   // Response same as what is in database.
    //   const calEvent = await CalendarEvent.findById(returnEvent._id);
    //   expect(new Date(returnEvent.startTime)).toStrictEqual(calEvent.startTime);
    //   expect(new Date(returnEvent.endTime)).toStrictEqual(calEvent.endTime);
    //   expect(returnEvent.name).toBe(calEvent.name);
});


it('Can post to create a new text widget and receive widget data in response', async () => {
    const body = {
        date: '2021-02-03',
        position: {
            row: 1,
            col: 1,
        },
        type: 'text'
      };
    const response = await axios.post(`http://localhost:${port}/api/journal`, body);
    const returnData = response.data;
    console.log(returnData)
});

it('Can PUT to update position of widget', async () => {

});

it('Can delete a widget', async () => {

});

it('Can GET all widgets for a day, with all the widget data for the day', async () => {
  const response = await axios.get(`http://localhost:${port}/api/journal/2021-01-01`);
  const returnData = response.data;
  
  expect(returnData.widgetData.length).toBe(2)
  expect(returnData.widgetData.length).toBe(2)
  //console.log(returnData)
});

it('Can GET a text widget', async () => {
  const response = await axios.get(`http://localhost:${port}/api/journal/2021-02-03`);
  const returnData = response.data;
  //console.log(returnData)
});

it('Can GET a habit widget using the no enddate/unlimted option', async () => {
    const response = await axios.get(`http://localhost:${port}/api/journal/2022-02-07`);
    const returnData = response.data;
    //console.log(returnData)
});