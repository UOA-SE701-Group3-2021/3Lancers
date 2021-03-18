  
const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createdDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
);

module.exports = mongoose.model('TodoTask', todoTaskSchema);