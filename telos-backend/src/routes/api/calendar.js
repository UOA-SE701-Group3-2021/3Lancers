const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json({
    endpoint: '/calendar',
    request: `POST name: ${req.body.name}, start: ${req.body.start}, end: ${req.body.end}, completed: ${req.body.completed}`,
  });
});

router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/calendar',
    request: `PUT id: ${req.params.id}, start: ${req.body.start}, end: ${req.body.end}, completed: ${req.body.completed}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/calendar',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
