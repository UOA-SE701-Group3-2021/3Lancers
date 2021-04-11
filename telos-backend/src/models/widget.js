const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema(
  {
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const widgetSchema = new mongoose.Schema({
  // date of the journal page the widget is for
  date: {
    type: Date,
    required: true,
  },
  // position of widget on journal page as JSON
  position: {
    type: positionSchema,
    required: true,
  },
  // type of widget, needs to match one of the given values
  type: {
    type: String,
    required: true,
    enum: ['calendar', 'todo', 'habit_tracker', 'text', 'youtube_player', 'clock'],
  },
});

module.exports = mongoose.model('Widget', widgetSchema);
