const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Course code is required."],
    },
    description: {
        type: String,
        required: [true, "Course description is required."],
    },
    units: {
        type: Number,
        required: [true, "Course units are required."],
    },
    tags: {
        type: [String],
        required: [true, "Tags field cannot be empty."],
    },
});

const yearSchema = new mongoose.Schema(
    {
        "1st Year": [courseSchema],
        "2nd Year": [courseSchema],
        "3rd Year": [courseSchema],
        "4th Year": [courseSchema],
    },
    {
        timestamps: true,
    }
);
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
      