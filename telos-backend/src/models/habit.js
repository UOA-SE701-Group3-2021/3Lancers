const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        // If habit is ongoing, will set default end date as the maximum possible value
        endDate: {
            type: Date,
            default: new Date(8640000000000000),
        },
        // days of the week that this habit is set for
        daysOfWeek: [{
            type: String,
            required: true,
            enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        }],
        // dates that this habit was completed
        completedDates: [{
            type: Date,
            default: [],
        }],
    },
);

module.exports = mongoose.model('Habit', habitSchema);
