const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  text: String,
  // foreign-key to widget model
  widgetId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Widget',
    required: true,
  },
});

module.exports = mongoose.model('Text', textSchema);
