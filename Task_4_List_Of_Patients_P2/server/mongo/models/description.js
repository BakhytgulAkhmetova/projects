const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for description */
const schema = new Schema({
    _id: Schema.Types.String,
    value: String
});

const description = mongoose.model('Descripton', schema);

module.exports = description;
