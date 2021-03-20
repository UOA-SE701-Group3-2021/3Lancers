const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  // foreign-key to widget model
  widgetId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Widget',
    required: true,
  },
});

module.exports = mongoose.model('Text', textSchema);
