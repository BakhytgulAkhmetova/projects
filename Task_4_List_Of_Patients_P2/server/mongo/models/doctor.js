const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const doctors = [
    {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Hunter',
        lastName:'Cooper'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Brittney ',
        lastName:'Ross'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Isha',
        lastName:'Wise'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Kelsey',
        lastName:'Heath'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Diya',
        lastName:'Mason'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Amber',
        lastName:'Cobb'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Tyrell',
        lastName:'Ali'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Denise',
        lastName:'Malone'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Bobbi',
        lastName:'Terry'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Charlotte',
        lastName:'Thompson'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Iona',
        lastName:'Mccarthy'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Scarlet',
        lastName:'Mendoza'
    }, {
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Ella',
        lastName:'Richards'
    }
];

/* Definition schema for Doctor */
const schema = new Schema({
    _id: Schema.Types.String,
    firstName: String,
    lastName: String
}, { strict: true });

var Doctor = mongoose.model('Doctor', schema);

// var collection = mongoose.createConnection('doctors');

var doctor = new Doctor({
    _id: new mongoose.Types.ObjectId(),
    firstName: 'Hunter',
    lastName:'Cooper'
});


// doctor.create(doctors);
// doctor.save();
// Doctor.insertMany(doctors);
doctor.save();

module.exports = Doctor;
