const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({
    endpoint: '/habittracker',
    request: `GET id: ${req.params.id}`,
  });
});

router.post('/', (req, res) => {
  res.json({
    endpoint: '/habittracker',
    request: `POST data: ${req.body.data}`,
  });
});

router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/habittracker',
    request: `PUT id: ${req.params.id}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/habittracker',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
