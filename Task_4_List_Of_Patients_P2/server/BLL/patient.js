const mongoose = require('mongoose');
const moment = require('moment');

/* import models from database */
const Patient  = require('../mongo/models/patient');

/* add new patient in dataBase */
async function addPatient({ firstName, lastName, birthDate, gender, phoneNumber, email }) {
    const patient = new Patient({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        birthDate,
        gender,
        phoneNumber,
        email
    });

    return await patient.save();
}

/* get all patients from dataBase*/
async function getPatientsPage({ skip, limit }) {
    let items = await Patient.find().skip(skip).limit(limit);
    const total = await Patient.find().estimatedDocumentCount();

    items = items.map((p) => {
        return { ...p.toObject(), age: moment.utc(new Date()).diff(moment.utc(p.birthDate), 'years') };
    });

    return { items, total };
}

async function deleteAllPatients() {
    return await Patient.deleteMany();
}

/* get one patient from dataBase by id */
async function getPatientById(id) {
    return await Patient.findById(id);
}

/* update patient in dataBase*/
async function updatePatient({ id, firstName, lastName, birthDate, gender, phoneNumber, email }) {
    const patient = new Patient({
        firstName,
        lastName,
        birthDate,
        gender,
        phoneNumber,
        email
    });

    return await Patient.findByIdAndUpdate(id, patient, { new: true });
}

module.exports = {
    addPatient,
    getPatientsPage,
    getPatientById,
    updatePatient,
    deleteAllPatients
};
