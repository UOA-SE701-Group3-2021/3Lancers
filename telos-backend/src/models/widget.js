  
const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema(
    {
        // date of the journal page the widget is for
        date: {
            type: Date,
            required: true,
        },
        // position of widget on journal page as JSON {row: Number, col: Number}
        position: {
            type: Object,
            required: true,
        },
        // type of widget from {calendar, todo, habit_tracker, text}
        type: {
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model('Widget', widgetSchema);