const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json({
    endpoint: '/habittracker',
    request: `POST name: ${req.body.name}, daysOfWeek: ${req.body.daysOfWeek}, start: ${req.body.start}, end: ${req.body.end}, completedDates: ${req.body.completedDates}`,
  });
});

router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/habittracker',
    request: `PUT id: ${req.params.id}, name: ${req.body.name}, daysOfWeek: ${req.body.daysOfWeek}, start: ${req.body.start}, end: ${req.body.end}, completedDates: ${req.body.completedDates}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/habittracker',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
