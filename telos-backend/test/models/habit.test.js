/* eslint-disable no-await-in-loop, no-return-await */
const mongoose = require('mongoose');
const dbHelper = require('../db-helper');
// Require the models from src/models
const Habit = require('../../src/models/habit');

beforeAll(async () => await dbHelper.connectToDb());

afterEach(async () => await dbHelper.clearDb());

afterAll(async () => await dbHelper.closeDb());

describe('Test Habit Model', () => {
  it('can be created and saved in memory', async () => {
    const testHabitData = {
      name: 'lorem ipsum',
      startDate: '2021-03-19',
      endDate: '2021-04-19',
      daysOfWeek: ['mon', 'wed', 'fri', 'sun'],
      completedDates: ['2021-03-19', '2021-03-21', '2021-03-24', '2021-03-26'],
    };
    const validTestData = new Habit(testHabitData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.name).toBe(validTestData.name);
    expect(savedTestModel.startDate).toBe(validTestData.startDate);
    expect(savedTestModel.endDate).toBe(validTestData.endDate);
    expect(savedTestModel.daysOfWeek).toBe(validTestData.daysOfWeek);
    expect(savedTestModel.completedDates).toBe(validTestData.completedDates);

    expect(savedTestModel._id).toBeDefined();
  });

  it('generates correct default value for the "endDate" field as largest possible date for nonstop habits', async () => {
    const testHabitData = {
      name: 'lorem ipsum',
      startDate: '2021-03-19',
      daysOfWeek: ['mon', 'wed', 'fri', 'sun'],
      completedDates: ['2021-03-19', '2021-03-21', '2021-03-24', '2021-03-26'],
    };
    const validTestData = new Habit(testHabitData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.endDate).toStrictEqual(new Date('+275760-09-13T00:00:00.000Z'));
  });

  it('can validate invalid days of the week', async () => {
    const testHabitData = {
      name: 'lorem ipsum',
      startDate: '2021-03-19',
      endDate: '2021-04-19',
      daysOfWeek: ['mon', 'tomorrow'],
      completedDates: ['2021-03-19', '2021-03-21', '2021-03-24', '2021-03-26'],
    };
    const invalidTestData = new Habit(testHabitData);
    let err;
    try {
      await invalidTestData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('generates correct default value (empty array) for the "completedDates" field', async () => {
    const testHabitData = {
      name: 'lorem ipsum',
      startDate: '2021-03-19',
      endDate: '2021-04-19',
      daysOfWeek: ['mon', 'wed', 'fri', 'sun'],
    };
    const validTestData = new Habit(testHabitData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.completedDates.toObject()).toStrictEqual([]);
  });
});
