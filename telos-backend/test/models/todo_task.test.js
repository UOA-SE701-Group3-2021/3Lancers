/* eslint-disable no-await-in-loop, no-return-await */
const dbHelper = require('../db-helper');
// Require the models from src/models
const TodoTask = require('../../src/models/todo_task');

beforeAll(async () => await dbHelper.connectToDb());

afterEach(async () => await dbHelper.clearDb());

afterAll(async () => await dbHelper.closeDb());

describe('Test TodoTask Model', () => {
  it('can be created and saved in memory', async () => {
    const testTodoTaskData = {
      name: 'Complete tests',
      createdDate: '2021-03-19',
      dueDate: '2021-03-21',
      completed: true,
    };
    const validTestData = new TodoTask(testTodoTaskData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.name).toBe(validTestData.name);
    expect(savedTestModel.createdDate).toBe(validTestData.createdDate);
    expect(savedTestModel.dueDate).toBe(validTestData.dueDate);
    expect(savedTestModel.completed).toBe(validTestData.completed);

    expect(savedTestModel._id).toBeDefined();
  });

  it('generates correct default value for the "completed" field', async () => {
    const testTodoTaskData = {
      name: 'Complete tests',
      createdDate: '2021-03-19',
      dueDate: '2021-03-21',
    };
    const validTestData = new TodoTask(testTodoTaskData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.completed).toBe(false);
  });
});
