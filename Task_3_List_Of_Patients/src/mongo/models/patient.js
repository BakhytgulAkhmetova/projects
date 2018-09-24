const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*Definition schema for patient */
const schema = new Schema({
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    birthDate: String,
    gender: String,
    phoneNumber: String,
    email: String
});

const modelPatient = mongoose.model('Patient', schema)

module.exports = modelPatient;