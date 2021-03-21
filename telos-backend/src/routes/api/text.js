const express = require('express');
const Text = require('../../models/text');

const router = express.Router();

router.post('/', (req, res) => {
  const newText = new Text({
    text: req.body.text,
    widgetId: req.body.widgetId,
  });
  newText.save((err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(201).json(newText);
  });
});

router.put('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Text.findOneAndUpdate(query, req.body, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Text.deleteOne(query, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

module.exports = router;
