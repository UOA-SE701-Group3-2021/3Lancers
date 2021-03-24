const TodoTask = require('./src/models/todo_task');

// Creating dummy todo task widget document if one doesn't already exist
TodoTask.find().countDocuments((err, count) => {
  if (count === 0) {
    const entry = new TodoTask({
      name: 'Lorem',
      createdDate: '2021-01-01',
      dueDate: '2021-01-01',
      completed: false,
    });
    entry.save();
  }
});

const Text = require('./src/models/text');

// Creating dummy text widget document if one doesn't already exist
Text.find().countDocuments((err, count) => {
  if (count === 0) {
    const entry = new Text({
      widgetId: 'abcdee6a0ba62570afcedd3a',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
        'ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
        'reprehenderit in voluptate velit esse cillum dolore eu fugiat' +
        'nulla pariatur. Excepteur sint occaecat cupidatat non proident,' +
        'sunt in culpa qui officia deserunt mollit anim id est laborum.',
    });
    entry.save();
  }
});
