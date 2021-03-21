const express = require('express');
const mongoose = require('mongoose');

// Setup Express and assign it a port (cannot be same as CRA default port)
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const router = require('./src/routes');

app.use('/', router);

// Basic message for verifying Express app is working
app.get('/', (req, res) => res.send('Telos app coming soon!'));

// Connect to local running instance of mongodb, on telosdatabase db
// useNewUrlParser recommended set to true, but must specify a port (using the default 27017)
// useUnifiedTopology recommended set to true (uses mongodb new connection management engine)
mongoose.connect('mongodb://localhost:27017/telosdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Callbacks to verify we have connected correctly, or when a connection error occurs
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to local database');
});

const todoTask = require('./src/models/todo_task.js');

todoTask.find().countDocuments(function(err, count) {
  if (count === 0) {
    console.log("Empty");
    var entry = new todoTask({
      name: "Lorem",
      createdDate: new Date(2021, 1, 1),
      dueDate: new Date(2022, 1, 1),
      completed: false
    });
    
    entry.save();
  }
});

// Launch app (start server running), with a simple logging statement, based on SE750 example
app.listen(port, () => console.log(`App server litening on port number: ${port}`));
