const mongoose = require('mongoose');

const Doctor = require('../models/doctor');

var doctor = new Doctor(
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
);

module.exports = doctor;
