The Telos backend server runs on the [Express](https://expressjs.com/) framework which is based on [Node.js](https://nodejs.org/en/). Persistence is handled with a [MongoDB](https://www.mongodb.com/) implementation through the [Mongoose](https://mongoosejs.com/) ORM library.

# Prerequisites
[Node.js](https://nodejs.org/en/): v14.16.0 was used during development.

[MongoDB](https://www.mongodb.com/): follow the installation and configuration instructions [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#procedure).

# Running the backend
1. Start a local MongoDB instance from the command line ([instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-from-cmd))
2. In a different terminal session, `cd` to `3Lancers/telos-backend`
3. Execute `npm ci` to install dependencies
4. Run the backend with `npm run start`
5. If successful, you should see this:

![image](https://user-images.githubusercontent.com/49678883/111965297-74555900-8b5a-11eb-802d-cabfa495932f.jpg)

# Testing
Testing is done using the [Jest](https://jestjs.io/) framework combined with an in-memory MongoDB instance ([mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server)). This allows testing to be done without needing to run a local database instance.

## Running tests
1. Ensure that a local MongoDB instance is _not_ running (use `Ctrl` + `C` at the command line to stop)
2. `cd` to `3Lancers/telos-backend`
3. Execute `npm run test`

## Writing tests
Both unit and integration tests are already set up with the former testing the data models (`test/models`), and the latter testing API endpoint behaviour (`test/integration`).

### Unit tests
These should check that a data model behaves as expected, which involves verifying the CRUD operations and validating the data.
To configure the database, make sure to include:
``` javascript
const dbHelper = require('../db-helper');

beforeAll(async () => await dbHelper.connectToDb());

afterEach(async () => await dbHelper.clearDb());

afterAll(async () => await dbHelper.closeDb());
```

### Integration tests
These should check that an API endpoint behaves correctly, by verifying the returned status code and response body. To configure the database, make sure to include:
``` javascript
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');

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

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});
```
API calls should be made using `axios`, like so:
``` javascript
await axios.post(url, body);
```

# Documentation
[API Endpoints](https://github.com/UOA-SE701-Group3-2021/3Lancers/wiki/API-Endpoints)

[Database Schema](https://github.com/UOA-SE701-Group3-2021/3Lancers/wiki/Database-Schema)