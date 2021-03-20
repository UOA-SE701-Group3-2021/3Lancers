const routes = require('../../src/routes');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

let mongod, app, server;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 * 
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async done => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

    app = express();
    app.use('/', routes);
    server = app.listen(3000, () => done());
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection('calendar_events');
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection('calendar_events');
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 * 
 * Also, stop the express server
 */
afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('can post a thing', async () => {
    const body = {
        "name": "Test calendar",
        "startTime": "2021-01-01T02:00:00",
        "endTime": "2021-01-01T05:00:00"
    };
    axios.post('http://localhost:3000/api/calendar/', {
        name: 'Test calendar',
        startTime: '2021-01-01T02:00:00',
        endTime: '2021-01-01T05:00:00'
    });
    //const returnEvent = response.data;

    //expect(returnEvent._id).toBeDefined();
});

// it('can post a thing', async () => {
//     await axios.put('http://localhost:3000/api/calendar/')
// });

// it('can delete a thing', async () => {
//     await axios.delete('http://localhost:3000/api/calendar/')
// });

it ('works', () => {
    expect("one").toBe("one")
});

it('get not defined', async () => {
    try{
        const response = await axios.get('http://localhost:3000/api/calendar')
    } catch (error) {
        err = error;
    }
    expect(err).toBeDefined();
});