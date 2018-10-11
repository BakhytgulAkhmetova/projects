const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Definition schema for doctor */
const schema = new Schema({
    _id: Schema.Types.ObjectId,
    firstname: String,
    lastname: String
});

const modelDoctor = mongoose.model('Descripton', schema);

module.exports = modelDoctor;
