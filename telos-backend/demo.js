const TodoTask = require('./src/models/todo_task');

TodoTask.find().countDocuments((err, count) => {
  if (count === 0) {
    console.log('Empty');
    const entry = new TodoTask({
      name: 'Lorem',
      createdDate: new Date(2021, 1, 1),
      dueDate: new Date(2022, 1, 1),
      completed: false,
    });

    entry.save();
  }
});
