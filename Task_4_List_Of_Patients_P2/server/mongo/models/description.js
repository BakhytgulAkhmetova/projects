const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for description */
const schema = new Schema({
    _id: Schema.Types.ObjectId,
    value: String
});

const modelDescription = mongoose.model('Descripton', schema);

module.exports = modelDescription;
