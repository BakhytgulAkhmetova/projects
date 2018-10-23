const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for Doctor */
const schema = new Schema({
    _id: Schema.Types.String,
    firstName: String,
    lastName: String
});

var doctor = mongoose.model('Doctor', schema);

module.exports = doctor;
