const express = require('express');
const CalendarEvent = require('../../models/calendar_event');

const router = express.Router();

router.post('/', async (req, res) => {
  const newCalendarEvent = new CalendarEvent({
    name: req.body.name,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  await newCalendarEvent.save();
  res.status(201).json(newCalendarEvent);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const calEvent = req.body;
  calEvent._id = id;

  const currentCalEvent = await CalendarEvent.findById(calEvent._id);
  if (currentCalEvent){
    currentCalEvent.name = calEvent.name
    currentCalEvent.startTime = calEvent.startTime
    currentCalEvent.endTime = calEvent.endTime
    await currentCalEvent.save();

    res.sendStatus(201);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await CalendarEvent.deleteOne({ _id: id});
  res.sendStatus(201);
});

module.exports = router;
