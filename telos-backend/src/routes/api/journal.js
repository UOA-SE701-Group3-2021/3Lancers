const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `GET start: ${req.query.startDate}, end: ${req.query.endDate}`,
  });
});

router.get('/:date', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `GET date: ${req.params.date}`,
  });
});

module.exports = router;
