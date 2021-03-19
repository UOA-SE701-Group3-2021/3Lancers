/* eslint-disable no-await-in-loop, no-return-await */
const mongoose = require('mongoose');
const dbHelper = require('../db-helper');
// Require the models from src/models
const Widget = require('../../src/models/widget');

beforeAll(async () => await dbHelper.connectToDb());

afterEach(async () => await dbHelper.clearDb());

afterAll(async () => await dbHelper.closeDb());

describe('Test Widget Model', () => {
  it('can be created and saved in memory', async () => {
    const testWidgetData = {
      date: '2021-03-19',
      position: {
        row: 3,
        col: 2,
      },
      type: 'calendar',
    };
    const validTestData = new Widget(testWidgetData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.date).toBe(validTestData.date);
    expect(savedTestModel.position).toBe(validTestData.position);
    expect(savedTestModel.type).toBe(validTestData.type);

    expect(savedTestModel._id).toBeDefined();
    expect(savedTestModel.position._id).toBe(undefined);
  });

  it('can validate invalid widget types', async () => {
    const testWidgetData = {
      date: '2021-03-19',
      position: {
        row: 3,
        col: 2,
      },
      type: 'fake widget',
    };
    const invalidTestData = new Widget(testWidgetData);
    let err;
    try {
      await invalidTestData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('can validate invalid position', async () => {
    const testWidgetData = {
      date: '2021-03-19',
      position: {
        row: 'three',
        col: 2,
      },
      type: 'calendar',
    };
    const invalidTestData = new Widget(testWidgetData);
    let err;
    try {
      await invalidTestData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
