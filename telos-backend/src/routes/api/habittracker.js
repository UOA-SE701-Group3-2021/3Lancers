const express = require('express');
const Habit = require('../../models/habit');

const router = express.Router();

// Note: When posting these habits, they can technically go on for an unlimited time.
// As a result, we persist the information in a different way from how we return it in
// the GET /api/journal endpoint to avoid creating a huge number of data points.
router.post('/', (req, res) => {
  const newHabit = new Habit({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    daysOfWeek: req.body.daysOfWeek,
    completedDates: req.body.completedDates,
  });
  newHabit.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(201).json(newHabit);
  });
});

router.put('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Habit.findOneAndUpdate(query, req.body, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Habit.deleteOne(query, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

module.exports = router;
