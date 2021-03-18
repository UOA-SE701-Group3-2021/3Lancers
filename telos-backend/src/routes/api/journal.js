const express = require('express');

const router = express.Router();

// get widgets which appear in the journal for a date range.
// params:
// 'date': journal date to get widgets for
router.get('/:date', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `GET date: ${req.params.date}`,
  });
});

// create widget in journal (widget data must be created separately)
// request body:
// 'date': date to insert widget into
// 'position': position of widget in journal for the specified date
// 'widget': type of widget i.e. 'calendar', etc.
router.post('/', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `POST date: ${req.body.date}, position: ${req.body.position}, widget: ${req.body.widget}`,
  });
});

// update widget in journal (e.g. change date, change position)
// request body:
// 'date': date to insert widget into
// 'position': position of widget in journal for the specified date
router.put('/:id', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `PUT id: ${req.params.id}, date: ${req.body.date}, position: ${req.body.position}`,
  });
});

// delete widget in journal page (but not any associated data)
router.delete('/:id', (req, res) => {
  res.json({
    endpoint: '/journal',
    request: `DELETE id: ${req.params.id}`,
  });
});

module.exports = router;
