const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for visit */
const schema = new Schema({
    _id: Schema.Types.String,
    descriptionId: Schema.Types.String,
    doctorId: Schema.Types.String,
    patientId: Schema.Types.String,
    date: Date
});

const visit = mongoose.model('Visit', schema);

module.exports = visit;
