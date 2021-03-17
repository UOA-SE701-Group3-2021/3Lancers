const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `GET widget: ${req.query.widget}, start: ${req.query.startDate}, end: ${req.query.endDate}`,
  });
});

router.get('/:date', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `GET date: ${req.params.date}, widget: ${req.query.widget}`,
  });
});

router.post('/', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `POST date: ${req.body.date}, position: ${req.body.position}, widgetId: ${req.body.widgetId}`,
  });
});

router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `PUT id: ${req.params.id}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
