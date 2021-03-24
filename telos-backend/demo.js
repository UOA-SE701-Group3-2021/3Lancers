const TodoTask = require('./src/models/todo_task');

// Check if there are any TodoTask documents
TodoTask.find().countDocuments((err, count) => {
  // If there are none
  if (count === 0) {
    // create new TodoTask document
    const entry = new TodoTask({
      name: 'Lorem',
      createdDate: '2021-01-01',
      dueDate: '2021-01-01',
      completed: false,
    });
    // save document
    entry.save();
  }
});

const Widget = require('./src/models/widget');
const Text = require('./src/models/text');

// look for existing text documents
Text.find().countDocuments((err, count) => {
  // If there are no text documents
  if (count === 0) {
    console.log('Empty');
    // create a new dummy document
    const entry = new Text({
      widgetId: 'abcdee6a0ba62570afcedd3a',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi'  + 
            'ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
            'reprehenderit in voluptate velit esse cillum dolore eu fugiat' + 
            'nulla pariatur. Excepteur sint occaecat cupidatat non proident,' + 
            'sunt in culpa qui officia deserunt mollit anim id est laborum.',
    });
    // save text document
    entry.save();
  }
});

