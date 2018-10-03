const mongoose = require('mongoose');
const moment = require('moment');

const Patient = require('./mongo/models/patient');

/* asynchronous function to add new patient in storage */
async function addPatient({
    firstName,
    lastName,
    birthDate,
    gender,
    phoneNumber,
    email }) {
    const patient = new Patient({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        birthDate,
        gender,
        phoneNumber,
        email
    });

    try {
        return await patient.save();
    } catch (error) {
        throw error;
    }
}

/* asynchronous function to get all patients from storage*/
async function getPatientsPage({ skip, limit }) {
    try {
        let items = await Patient.find().skip(skip).limit(limit);
        const total = await Patient.find().estimatedDocumentCount();

        items = items.map((p) => {
            return {
                ...p.toObject(),
                id: p._id.toString(),
                age: moment.utc(new Date()).diff(moment.utc(p.birthDate), 'years')
            };
        });
        return { items, total };
    } catch (error) {
        throw error;
    }
}

async function deleteAllPatients() {
    try {
        return await Patient.deleteMany();
    } catch (error) {
        throw error;
    }
}

/* asynchronous function to get one patient from storage by id */
async function getPatientById(id) {
    try {
        return await Patient.findById(id);
    } catch (error) {
        throw error;
    }
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

    try {
        return await Patient.findByIdAndUpdate(id, patient, { new: true });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addPatient,
    getPatientsPage,
    getPatientById,
    updatePatient,
    deleteAllPatients
};
