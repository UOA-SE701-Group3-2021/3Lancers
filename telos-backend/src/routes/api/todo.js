const express = require('express');
const TodoTask = require('../../models/todo_task');

const router = express.Router();

router.post('/', (req, res) => {
  const newTodoTask = new TodoTask({
    name: req.body.name,
    createdDate: new Date(),
    dueDate: new Date(req.body.dueDate),
    completed: false,
  });
  newTodoTask.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(201).json(newTodoTask);
  });
});

router.put('/:id', (req, res) => {
  const query = { _id: req.params.id };

  TodoTask.findOneAndUpdate(query, req.body, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  TodoTask.deleteOne(query, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

module.exports = router;
