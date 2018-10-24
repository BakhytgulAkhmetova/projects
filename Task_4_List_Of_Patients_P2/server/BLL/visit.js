const mongoose = require('mongoose');

const Visit  = require('../mongo/models/visit');
const Patient = require('../mongo/models/patient');
const Description = require('../mongo/models/description');
const Doctor = require('../mongo/models/doctor');

/* asynchronous function to add new patient in storage */
async function addVisit({ date, patientId, doctorId, descriptionId }) {
    // const patient = await Patient.findById(patientId);
    // const doctor = await Doctor.findById(doctorId);
    // const description = await Description.findById(descriptionId);

    console.log(patientId);

    const visit = new Visit({
        _id: new mongoose.Types.ObjectId(),
        patient: patientId,
        doctor: doctorId,
        description: descriptionId,
        date
    });

    return await visit.save();
}

/* asynchronous function to get all patients from storage*/
async function getVisitsPage({ skip, limit }) {
    // const items = await Visit.find().skip(skip).limit(limit);
    const total = await Visit.find().estimatedDocumentCount();

    const items = await Visit.find()
        .populate('patient')
        .populate('doctor')
        .populate('description')
        .skip(skip).limit(limit);

    return { items, total };
}

/* asynchronous function to get selected patients from storage*/
async function getSelectedPatients({ letters }) {
    let patients = await Patient.find({ firstName: { $regex: `^${  letters }`, $options: 'i' } });

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
    let doctors = await Doctor.find({ firstName: { $regex: `^${  letters }`, $options: 'i' } });

    doctors = doctors.map((d) => {
        return {
            label: `${d.firstName  }${  d.lastName}`,
            value: d._id
        };
    });

    return doctors;
}

/* asynchronous function to get selected descriptions from storage*/
async function getSelectedDescriptions({ letters }) {
    let descriptions = await Description.find({ value: { $regex: `^${  letters }`, $options: 'i' } });

    descriptions = descriptions.map((d) => {
        return {
            label: d.value,
            value: d._id
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
    deleteAllVisits,
    getVisitsPage
};
