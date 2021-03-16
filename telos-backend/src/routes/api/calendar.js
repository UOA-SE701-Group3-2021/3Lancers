const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({
    endpoint: '/calendar',
    request: `GET id: ${req.params.id}`,
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.json({
    endpoint: '/calendar',
    request: `POST date: ${req.body.date}, position: ${req.body.position}`,
  });
});

router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/calendar',
    request: `PUT id: ${req.params.id}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/calendar',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
