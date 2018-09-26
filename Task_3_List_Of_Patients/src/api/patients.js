const mongoose = require('mongoose');

const Patient = require('../mongo/models/patient');
const setPatientAge = require('../utils/setPatientAge');
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
        return error;
    }
}

/* asynchronous function to get all patients from storage*/
async function getPage({ skip, limit }) {
    try {
        let items = await Patient.find().skip(skip).limit(limit);
        const total = await Patient.find().estimatedDocumentCount();
        items = items.map((p) => {
            return {
                ...p.toObject(),
                id: p._id.toString(),
                age: setPatientAge(p.birthDate)
            };
        });
        return { items, total };
    } catch (error) {
        return error;
    }
}

async function deleteAll() {
    try {
        await Patient.deleteMany();
        return 0;
    } catch (error) {
        return error;
    }
}

/* asynchronous function to get one patient from storage by id */
async function getPatientById(id) {
    try {
        return await Patient.findById(id);
    } catch (error) {
        return error;
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
        return error;
    }
}

module.exports = {
    addPatient,
    getPage,
    getPatientById,
    updatePatient,
    deleteAll
};
