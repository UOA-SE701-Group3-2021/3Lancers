const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json({
    endpoint: '/text',
    request: `POST text: ${req.body.text}, widgetId: ${req.body.widgetId}`,
  });
});

router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/text',
    request: `PUT id: ${req.params.id}, text: ${req.body.text}, widgetId: ${req.body.widgetId}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/text',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
