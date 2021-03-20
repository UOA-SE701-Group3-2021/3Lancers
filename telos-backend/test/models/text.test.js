/* eslint-disable no-await-in-loop, no-return-await */
const mongoose = require('mongoose');
const dbHelper = require('../db-helper');
// Require the models from src/models
const Text = require('../../src/models/text');

beforeAll(async () => await dbHelper.connectToDb());

afterEach(async () => await dbHelper.clearDb());

afterAll(async () => await dbHelper.closeDb());

describe('Test Text Model', () => {
  it('can be created and saved in memory', async () => {
    const testTextData = {
      text: 'lorem ipsum',
      widgetId: '5d6ede6a0ba62570afcedd3a',
    };
    const validTestData = new Text(testTextData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.text).toBe(validTestData.text);
    expect(savedTestModel.widgetId).toBe(validTestData.widgetId);

    expect(savedTestModel._id).toBeDefined();
  });

  it('can validate improper widgetId inputs', async () => {
    const testTextData = {
      text: 'lorem ipsum',
      widgetId: 'fakeid',
    };
    const invalidTestData = new Text(testTextData);
    let err;
    try {
      await invalidTestData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
