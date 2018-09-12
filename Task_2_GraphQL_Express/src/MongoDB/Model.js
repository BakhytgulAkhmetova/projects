const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* definition schema for mongoDB document */
const schema = new Schema({
    name: String,
    _id: mongoose.Schema.Types.ObjectId,
    marks: [Number]
});

const modelStudent = mongoose.model('Student', schema);

module.exports = modelStudent;
