const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
});
const toDoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "Other"
    },
    forToday: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

const toDo = mongoose.model("To Do", toDoSchema);
const category = mongoose.model("Category", categorySchema);

module.exports = {
    toDo,
    category
};