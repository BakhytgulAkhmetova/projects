const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for visit */
const schema = new Schema({
    _id: Schema.Types.ObjectId,
    descriptionId: Schema.Types.ObjectId,
    doctorId: Schema.Types.ObjectId,
    patientId: Schema.Types.ObjectId,
    date: Date
});

const modelVisit = mongoose.model('Visit', schema);

module.exports = modelVisit;
