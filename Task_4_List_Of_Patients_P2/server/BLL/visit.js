const mongoose = require('mongoose');
const moment = require('moment');

const Visit  = require('../mongo/models/visit');
const Patient = require('../mongo/models/patient');
const Description = require('../mongo/data/description');
const Doctor = require('../mongo/data/doctor');

/* asynchronous function to add new patient in storage */
async function addVisit() {
    const visit = new Visit({
    });

    try {
        return await visit.save();
    } catch (error) {
        throw error;
    }
}

/* asynchronous function to get selected patients from storage*/
async function getSelectedPatients(firstName) {
    try {
        let patients = await Patient.find({ firstName: firstName });

        patients = patients.map((p) => {
            return {
                firstName: p.firstName,
                lastName: p.lastName,
                id: p._id.toString()
            };
        });
        return patients;
    } catch (error) {
        throw error;
    }
}

async function deleteAllVisits() {
    try {
        return await Visit.deleteMany();
    } catch (error) {
        throw error;
    }
}

/* asynchronous function to get one patient from storage by id */
async function getVisitById(id) {
    try {
        return await Visit.findById(id);
    } catch (error) {
        throw error;
    }
}

/* asynchronous function to update info about patient in storage by id */
async function updateVisit({ id, firstName, lastName, birthDate, gender, phoneNumber, email }) {
    const patient = new Visit({
        firstName,
        lastName,
        birthDate,
        gender,
        phoneNumber,
        email
    });

    try {
        return await Visit.findByIdAndUpdate(id, patient, { new: true });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addVisit,
    getSelectedPatients,
    getVisitById,
    updateVisit,
    deleteAllVisits
};
