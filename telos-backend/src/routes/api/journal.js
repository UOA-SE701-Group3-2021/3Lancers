const express = require('express');

const router = express.Router();

// get widgets for a date range.
// query params:
// 'widget': type of widget i.e. 'all', 'calendar', etc.
// 'startDate': start date
// 'endDate': end date
router.get('/', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `GET widget: ${req.query.widget}, start: ${req.query.startDate}, end: ${req.query.endDate}`,
  });
});

// get widgets for a single date.
// query params:
// 'widget': type of widget i.e. 'all', 'calendar', etc.
router.get('/:date', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `GET date: ${req.params.date}, widget: ${req.query.widget}`,
  });
});

// create widget entry in journal (widget must be created separately)
// request body:
// 'date': date to insert widget into
// 'position': position of widget in journal for the specified date
// 'widgetId': id of widget to put in journal
router.post('/', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `POST date: ${req.body.date}, position: ${req.body.position}, widgetId: ${req.body.widgetId}`,
  });
});

// update widget entry in journal (e.g. change date, change position)
// request body:
// 'date': date to insert widget into
// 'position': position of widget in journal for the specified date
router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `PUT id: ${req.params.id}, date: ${req.body.date}, position: ${req.body.position}`,
  });
});

// delete widget entry in journal (but not the widget itself)
router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
