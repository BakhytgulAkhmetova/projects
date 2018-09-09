const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    _id: mongoose.Schema.Types.ObjectId,
    marks: Array
});

const modelStudent = mongoose.model('Student', schema);

module.exports = modelStudent;
