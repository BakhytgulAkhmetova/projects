const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for visit */
const schema = new Schema({
    _id: Schema.Types.String,
    description: { type: Schema.Types.String, ref: 'Descripton' },
    doctor: { type: Schema.Types.String, ref: 'Doctor' },
    patient: { type: Schema.Types.String, ref: 'Patient' },
    date: Date
});

const visit = mongoose.model('Visit', schema);

module.exports = visit;
