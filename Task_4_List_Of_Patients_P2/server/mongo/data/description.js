const mongoose = require('mongoose');

const Descripton = require('../models/description');

var description = new Descripton(
    {
        _id: new mongoose.Types.ObjectId(),
        value: 'Abdominal Aortic Aneurysm'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Acinetobacter Infection'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'American Indian and Alaska Native Vaccination'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Ascaris Infection [Ascariasis]'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Birth Defects'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Bronchitis'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Epilepsy'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Extreme Cold [Hypothermia]'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Healthy Weight'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Heat Stress'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Hemophilia'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Malaria'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Molluscum Contagiosum'
    },{
        _id: new mongoose.Types.ObjectId(),
        value: 'Mucormycosis'
    }
);

module.exports = description;
