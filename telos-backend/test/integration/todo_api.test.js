const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const routes = require('../../src/routes');
const TodoTask = require('../../src/models/todo_task');

let mongod;
let app;
let server;
let task1;
let task2;
let task3;
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
  const coll = await mongoose.connection.db.createCollection('todotasks');

  task1 = {
    name: 'task1',
    createdDate: '2021-01-01T00:00:00',
    dueDate: '2021-01-01T00:00:00',
    completed: false,
  };

  task2 = {
    name: 'task2',
    createdDate: '2021-01-01T00:00:00',
    dueDate: '2021-01-02T00:00:00',
    completed: false,
  };

  task3 = {
    name: 'task3',
    createdDate: '2021-01-01T00:00:00',
    dueDate: '2021-01-03T00:00:00',
    completed: false,
  };

  await coll.insertMany([task1, task2, task3]);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('todotasks');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

it('Can post a todo task', async () => {
  const body = {
    name: 'Test todo task',
    createdDate: '2021-01-01T00:00:00',
    dueDate: '2021-01-04T00:00:00',
    completed: false,
  };
  const response = await axios.post(`http://localhost:${port}/api/todo`, body);
  const returnTask = response.data;

  expect(returnTask._id).toBeDefined();
  expect(returnTask.name).toBe(body.name);
  expect(new Date(returnTask.createdDate)).toStrictEqual(new Date(body.createdDate));
  expect(new Date(returnTask.dueDate)).toStrictEqual(new Date(body.dueDate));
  expect(returnTask.completed).toBe(body.completed);

  // Response same as what is in database.
  const todoTask = await TodoTask.findById(returnTask._id);
  expect(returnTask.name).toBe(todoTask.name);
  expect(new Date(returnTask.createdDate)).toStrictEqual(new Date(todoTask.createdDate));
  expect(new Date(returnTask.dueDate)).toStrictEqual(new Date(todoTask.dueDate));
  expect(returnTask.completed).toBe(todoTask.completed);
});

it('Can put a todo task to update it', async () => {
  await axios.put(`http://localhost:${port}/api/todo/${task1._id}`, {
    _id: task1._id,
    name: 'Updated task1',
    startTime: '2021-01-01T00:00:00',
    endTime: '2021-02-01T00:00:00',
  });

  // Check 1 remains same, others change.
  const todoTask = await TodoTask.findById(task1._id);
  expect(todoTask.name).toBe('Updated task1');
  expect(new Date(todoTask.createdDate)).toStrictEqual(new Date(task1.createdDate));
  expect(new Date(todoTask.dueDate)).toStrictEqual(new Date(task1.dueDate));
  expect(todoTask.completed).toBe(task1.completed);
});

it('can delete a task', async () => {
  const todoTasksBeforeDelete = await TodoTask.find();
  expect(todoTasksBeforeDelete.length).toBe(3);

  await axios.delete(`http://localhost:${port}/api/todo/${task1._id}`);
  const todotasks = await TodoTask.find();

  expect(todotasks.length).toBe(2);

  // Check task2 is the same
  expect(todotasks[0]._id).toStrictEqual(task2._id);
  expect(todotasks[0].name).toBe(task2.name);
  expect(new Date(todotasks[0].createdDate)).toStrictEqual(new Date(task2.createdDate));
  expect(new Date(todotasks[0].dueDate)).toStrictEqual(new Date(task2.dueDate));
  expect(todotasks[0].completed).toBe(task2.completed);

  // Check event3 is the same
  expect(todotasks[1]._id).toStrictEqual(task3._id);
  expect(todotasks[1].name).toBe(task3.name);
  expect(new Date(todotasks[1].createdDate)).toStrictEqual(new Date(task3.createdDate));
  expect(new Date(todotasks[1].dueDate)).toStrictEqual(new Date(task3.dueDate));
  expect(todotasks[1].completed).toBe(task3.completed);
});

it('GET not defined', async () => {
  let err;
  try {
    await axios.get(`http://localhost:${port}/api/todo`);
  } catch (error) {
    err = error;
  }
  expect(err).toBeDefined();
});
