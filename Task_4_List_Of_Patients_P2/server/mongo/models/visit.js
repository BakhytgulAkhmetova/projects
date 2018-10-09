const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for visit */
const schema = new Schema({
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    birthDate: Date,
    gender: { type: String, enum: ['Male', 'Female'] },
    phoneNumber: String,
    email: String
});

const modelPatient = mongoose.model('Patient', schema);

module.exports = modelPatient;
