const mongoose = require('mongoose');

const Visit  = require('../mongo/models/visit');
const Patient = require('../mongo/models/patient');
const Description = require('../mongo/data/description');
const Doctor = require('../mongo/data/doctor');

/* asynchronous function to add new patient in storage */
async function addVisit({ date, patientId, doctorId, descriptionId }) {
    const visit = new Visit({
        _id: new mongoose.Types.ObjectId(),
        patientId,
        date,
        doctorId,
        descriptionId
    });

    return await visit.save();
}

/* asynchronous function to get selected patients from storage*/
async function getSelectedPatients({ letters }) {
    let patients = await Patient.find({ firstName: { $regex: letters, $options: 'i' } });

    patients = patients.map((p) => {
        return {
            label: `${p.firstName  }${  p.lastName}`,
            value: p._id
        };
    });

    return patients;
}

/* asynchronous function to get selected doctors from storage*/
async function getSelectedDoctors({ letters }) {
    console.log(Doctor);
    let doctors = await Doctor.find({ firstName: { $regex: letters, $options: 'i' } });

    doctors = doctors.map((d) => {
        return {
            firstName: d.firstName,
            lastName: d.lastName,
            id: d._id
        };
    });

    return doctors;
}

/* asynchronous function to get selected descriptions from storage*/
async function getSelectedDescriptions({ letters }) {
    let descriptions = await Description.find({ value: { $regex: letters, $options: 'i' } });

    descriptions = descriptions.map((d) => {
        return {
            value: d.value,
            id: d._id
        };
    });

    return descriptions;
}

/* asynchronous function to delete all visits*/
async function deleteAllVisits() {
    return await Visit.deleteMany();
}

/* asynchronous function to get one patient from storage by id */
async function getVisitById(id) {
    return await Visit.findById(id);
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

    return await Visit.findByIdAndUpdate(id, patient, { new: true });
}

module.exports = {
    addVisit,
    getSelectedPatients,
    getSelectedDoctors,
    getSelectedDescriptions,
    getVisitById,
    updateVisit,
    deleteAllVisits
};
