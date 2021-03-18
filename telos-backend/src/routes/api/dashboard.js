const express = require('express');

const router = express.Router();

// get widgets which appear on the dashboard for a date range.
// query params:
// 'widget': type of widget i.e. 'all', 'calendar', etc.
// 'startDate': start date
// 'endDate': end date
router.get('/:widget', (req, res) => {
  res.json({
    endpoint: '/dashboard',
    request: `GET widget type: ${req.params.widget}, start: ${req.query.startDate}, end: ${req.query.endDate}`,
  });
});

module.exports = router;
