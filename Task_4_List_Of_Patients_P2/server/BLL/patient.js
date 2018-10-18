const mongoose = require('mongoose');
const moment = require('moment');

const Patient = require('../mongo/models/patient');

/* asynchronous function to add new patient in storage */
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

/* asynchronous function to get all patients from storage*/
async function getPatientsPage({ skip, limit }) {
    let items = await Patient.find().skip(skip).limit(limit);
    const total = await Patient.find().estimatedDocumentCount();

    items = items.map((p) => {
        return {
            ...p.toObject(),
            id: p._id,
            age: moment.utc(new Date()).diff(moment.utc(p.birthDate), 'years')
        };
    });

    return { items, total };
}

async function deleteAllPatients() {
    return await Patient.deleteMany();
}

/* asynchronous function to get one patient from storage by id */
async function getPatientById(id) {
    return await Patient.findById(id);
}

/* asynchronous function to update info about patient in storage by id */
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
