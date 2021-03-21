const express = require('express');
const CalendarEvent = require('../../models/calendar_event');

const router = express.Router();

router.post('/', async (req, res) => {
  const newCalendarEvent = new CalendarEvent({
    name: req.body.name,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  await newCalendarEvent.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(201).json(newCalendarEvent);
  });
});

router.put('/:id', async (req, res) => {
  const query = { _id: req.params.id };

  CalendarEvent.findOneAndUpdate(query, req.body, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  CalendarEvent.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

module.exports = router;
