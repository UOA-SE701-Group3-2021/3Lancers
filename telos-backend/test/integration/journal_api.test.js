/* eslint-disable one-var, no-undef,  */
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

let mongod, app, server;
let newEvent1;
let event1, event2;
let newWidget1, newWidget2, newWidget3;
let habit1, habit2;
let newText1;
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
  // const widgetColl = await mongoose.connection.db.createCollection('widgets');
  widget1 = {
    date: '2021-01-01',
    position: {
      row: 2,
      col: 2,
    },
    type: 'habit_tracker',
  };
  widget2 = {
    date: '2021-01-01',
    position: {
      row: 2,
      col: 3,
    },
    type: 'todo',
  };
  widget3 = {
    date: '2021-02-03',
    position: {
      row: 2,
      col: 3,
    },
    type: 'text',
  };
  // Note: Doing this way because of how times are saved.
  // When .save(), converts auto to UTC. This is the way we intend it to work
  newWidget1 = new Widget(widget1);
  await newWidget1.save();
  newWidget2 = new Widget(widget2);
  await newWidget2.save();
  newWidget3 = new Widget(widget3);
  await newWidget3.save();
  // await widgetColl.insertMany([widget1, widget2, widget3]);

  // const calendarColl = await mongoose.connection.db.createCollection('calendarevents');
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

  newEvent1 = new CalendarEvent(event1);
  await newEvent1.save();
  const newEvent2 = new CalendarEvent(event2);
  await newEvent2.save();
  // await calendarColl.insertMany([event1, event2]);

  // const habitColl = await mongoose.connection.db.createCollection('habits');
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

  const newHabit1 = new Habit(habit1);
  await newHabit1.save();
  const newHabit2 = new Habit(habit2);
  await newHabit2.save();
  // await habitColl.insertMany([habit1, habit2]);

  // const textColl = await mongoose.connection.db.createCollection('texts');
  text1 = {
    text: 'text1',
    widgetId: newWidget3._id,
  };
  newText1 = new Text(text1);
  await newText1.save();
  // await textColl.insertMany([text1]);

  // const todoColl = await mongoose.connection.db.createCollection('todo_tasks');
  todo1 = {
    name: 'test1',
    createdDate: '2021-01-01',
    dueDate: '2021-01-01',
    completed: true,
  };
  todo2 = {
    name: 'test2',
    createdDate: '2020-01-01',
    dueDate: '2021-01-01',
    completed: false,
  };
  todo3 = {
    name: 'test3',
    createdDate: '2021-01-01',
    dueDate: '2023-01-01',
    completed: true,
  };
  todo4 = {
    name: 'test3',
    createdDate: '2020-01-01',
    dueDate: '2023-01-01',
    completed: false,
  };
  const newTodo1 = new Todo(todo1);
  await newTodo1.save();
  const newTodo2 = new Todo(todo2);
  await newTodo2.save();
  const newTodo3 = new Todo(todo3);
  await newTodo3.save();
  const newTodo4 = new Todo(todo4);
  await newTodo4.save();
  // await todoColl.insertMany([todo1, todo2]);
});

afterEach(async () => {
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
    type: 'calendar',
  };
  const response = await axios.post(`http://localhost:${port}/api/journal`, body);
  const returnData = response.data;
  // Expect a response of the form: {
  // widget: {(same as above, but with _id field)}
  // data: {same as making data above eg. for calendar, but with an _id field}
  // }
  // Expect to get the first calendar event only
  expect(returnData.data.length).toBe(1);
  expect(returnData.data[0].name).toBe(newEvent1.name);

  expect(returnData.widget._id).toBeDefined();
  expect(returnData.widget.type).toBe('calendar');
  expect(returnData.widget.position.row).toBe(body.position.row);
});

it('Can post to create a new text widget and receive widget data in response', async () => {
  // This test is made as creating a text widget must also create a Text object in db with
  // empty string.
  const body = {
    date: '2021-02-03',
    position: {
      row: 1,
      col: 1,
    },
    type: 'text',
  };
  const response = await axios.post(`http://localhost:${port}/api/journal`, body);
  const returnData = response.data;
  expect(returnData.data.length).toBe(1);
  expect(returnData.data[0].text).toBe(''); // Expect the empty string for new Text

  expect(returnData.widget._id).toBeDefined();
  expect(returnData.widget.type).toBe('text');
  expect(returnData.widget.position.row).toBe(body.position.row);
});

it('Can PUT to update position of widget', async () => {
  await axios.put(`http://localhost:${port}/api/journal/${newWidget1._id}`, {
    position: {
      row: 3, // Change row and col
      col: 4,
    },
  });

  const widgetData = await Widget.findById(newWidget1._id);
  expect(widgetData.position.row).toBe(3);
  expect(widgetData.position.col).toBe(4);

  expect(widgetData._id).toStrictEqual(newWidget1._id);
  expect(widgetData.type).toBe(newWidget1.type);
  expect(widgetData.name).toBe(newWidget1.name);
});

it('Can delete a widget', async () => {
  await axios.delete(`http://localhost:${port}/api/journal/${newWidget2._id}`);
  const widgets = await Widget.find();
  expect(widgets.length).toBe(2);

  expect(widgets[0].name).toBe(newWidget1.name);
  expect(widgets[1].name).toBe(newWidget3.name);
});

it('Can GET all widgets for a day, with all the widget data for the day', async () => {
  const response = await axios.get(`http://localhost:${port}/api/journal/2021-01-01`);
  const returnData = response.data;
  // Expect a response as follows:
  //   {
  //       widgetData: [array of widgets like above, with _id fields]
  //       calendarData: [array of all calendar data on day, regardless if widget present]
  //       habitData: [array of habit data on day, regardless if widget present]
  //       textData: []
  //       todoData: []
  //   }
  // Idea is that all info is given and used as necessary.
  expect(returnData.widgetData.length).toBe(2);
  expect(returnData.widgetData[0].position.row).toBe(2); // Position defined
  expect(returnData.widgetData[0].type).toBe('habit_tracker');

  expect(returnData.calendarData.length).toBe(1);
  expect(returnData.textData.length).toBe(0);
  expect(returnData.habitData.length).toBe(1);
  expect(returnData.todoData.length).toBe(3); // Either overdue or present for all of them
});

it('Can GET a text widget', async () => {
  const response = await axios.get(`http://localhost:${port}/api/journal/2021-02-03`);
  const returnData = response.data;
  expect(returnData.calendarData.length).toBe(0);
  expect(returnData.textData.length).toBe(1);
  expect(returnData.textData[0].text).toBe(newText1.text);
  expect(returnData.textData[0].widgetId).toBe(newWidget3.id);
  expect(returnData.habitData.length).toBe(0);
  expect(returnData.todoData.length).toBe(1);
});

it('Can GET a habit widget using the no enddate/unlimted option', async () => {
  const response = await axios.get(`http://localhost:${port}/api/journal/2022-02-07`);
  const returnData = response.data;
  expect(returnData.habitData.length).toBe(1);
  expect(returnData.habitData[0].date).toBe('2022-02-07');
});
