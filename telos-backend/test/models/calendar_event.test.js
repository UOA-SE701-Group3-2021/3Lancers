/* eslint-disable no-await-in-loop, no-return-await */
const dbHelper = require('../db-helper');
// Require the models from src/models
const CalendarEvent = require('../../src/models/calendar_event');

beforeAll(async () => await dbHelper.connectToDb());

afterEach(async () => await dbHelper.clearDb());

afterAll(async () => await dbHelper.closeDb());

describe('Test Calendar Event Model', () => {
  it('can be created and saved in memory', async () => {
    const testCalendarEventData = {
      name: 'lorem ipsum',
      startTime: '2021-03-19T09:00',
      endTime: '2021-03-19T11:30',
    };
    const validTestData = new CalendarEvent(testCalendarEventData);
    const savedTestModel = await validTestData.save();

    expect(savedTestModel.name).toBe(validTestData.name);
    expect(savedTestModel.startTime).toBe(validTestData.startTime);
    expect(savedTestModel.endTime).toBe(validTestData.endTime);

    expect(savedTestModel._id).toBeDefined();
  });
});
