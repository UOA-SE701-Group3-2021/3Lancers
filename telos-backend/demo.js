const todoTask = require('./src/models/todo_task');

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