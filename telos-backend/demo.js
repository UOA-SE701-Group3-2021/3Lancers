const TodoTask = require('./src/models/todo_task');

TodoTask.find().countDocuments((err, count) => {
  if (count === 0) {
    console.log('Empty');
    const entry = new TodoTask({
      name: 'Lorem',
      createdDate: '2021-01-01',
      dueDate: '2021-01-01',
      completed: false,
    });

    entry.save();
  }
});
