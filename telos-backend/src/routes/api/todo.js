const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json({
    endpoint: '/todo',
    request: `POST name: ${req.body.name}, created: ${req.body.created}, due: ${req.body.due}, onGoing: ${req.body.onGoing}, completed: ${req.body.completed}`,
  });
});

router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/todo',
    request: `PUT id: ${req.params.id}, name: ${req.body.name}, created: ${req.body.created}, due: ${req.body.due}, onGoing: ${req.body.onGoing}, completed: ${req.body.completed}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/todo',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
