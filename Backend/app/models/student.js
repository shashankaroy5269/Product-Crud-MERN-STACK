const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },

    studentEmail: {
        type: String,
        required: true,
        unique: true
    },

    studentPhone: {
        type: Number,
        required: true
    },

    studentAge: {
        type: Number,
        required: true
    },

    studentCourse: {
        type: String,
        required: true
    },

    studentImage: {
        type: String,
        default: 'student.png'
    },

    address: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
});

const StudentModel = mongoose.model('student', StudentSchema);

module.exports = StudentModel;