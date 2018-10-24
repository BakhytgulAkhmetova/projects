const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for patient */
const schema = new Schema({
    _id: Schema.Types.String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    gender: { type: String, enum: ['Male', 'Female'] },
    phoneNumber: String,
    email: String
});

const Patient = mongoose.model('Patient', schema);

module.exports = Patient;
