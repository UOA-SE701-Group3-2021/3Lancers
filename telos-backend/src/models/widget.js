const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema(
    {
        // date of the journal page the widget is for
        date: {
            type: Date,
            required: true,
        },
        // position of widget on journal page as JSON
        position: {
            type: { row: Number, col: Number },
            required: true,
        },
        // type of widget, needs to match one of the given values
        type: {
            type: String,
            required: true,
            enum: ["calendar", "todo", "habit_tracker", "text"]
        },
    },
);

module.exports = mongoose.model('Widget', widgetSchema);
