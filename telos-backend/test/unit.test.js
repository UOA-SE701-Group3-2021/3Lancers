/* eslint-disable no-await-in-loop, no-return-await */
const mongoose = require('mongoose');
const dbHelper = require('./db-helper');
// Require the models from src/models

beforeAll(async () => await dbHelper.connectToDb());

afterEach(async () => await dbHelper.clearDb());

afterAll(async () => await dbHelper.closeDb());

// A test model to demonstrate if it works or not
const testSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
});
const TestModel = mongoose.model('TestModel', testSchema);

describe('test schema creation', () => {
    it('can be created and save in memory', async () => {
        const testData = {
            name: 'Test event',
            startTime: "2021-01-01"
        };
        const validTestData = new TestModel(testData);
        const savedTestModel = await validTestData.save();

        expect(savedTestModel.name).toBe(validTestData.name)
        expect(savedTestModel.startTime).toBe(validTestData.startTime)

        expect(savedTestModel._id).toBeDefined();
    });
});
