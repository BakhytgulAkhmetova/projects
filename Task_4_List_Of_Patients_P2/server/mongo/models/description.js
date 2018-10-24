const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for description */
const schema = new Schema({
    _id: Schema.Types.String,
    value: String
});

const Description = mongoose.model('Descripton', schema);

module.exports = Description;
