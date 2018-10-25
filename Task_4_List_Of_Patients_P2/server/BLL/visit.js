const mongoose = require('mongoose');
const moment = require('moment');

const Visit  = require('../mongo/models/visit');
const Patient = require('../mongo/models/patient');
const Description = require('../mongo/models/description');
const Doctor = require('../mongo/models/doctor');

/* asynchronous function to add new patient in storage */
async function addVisit({ date, patientId, doctorId, descriptionId }) {
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
    const total = await Visit.find().estimatedDocumentCount();

    let items = await Visit.find()
        .populate('patient')
        .populate('doctor')
        .populate('description')
        .skip(skip).limit(limit);

    items = items.map((item) => {
        return {
            ...item.toObject(),
            id: item._id,
            patient: item.patient.firstName + item.patient.lastName,
            doctor: item.doctor.firstName + item.doctor.lastName,
            description: item.description.value,
            date: moment(item.date).format('DD-MM-YYYY')
        };
    });

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

/* asynchronous function to get one visit from storage by id */
async function getVisitById(id) {
    const visit =  await Visit.findById(id)
        .populate('patient')
        .populate('doctor')
        .populate('description');

    return {
        ...visit.toObject(),
        id: visit._id,
        patient: visit.patient.firstName + visit.patient.lastName,
        doctor: visit.doctor.firstName + visit.doctor.lastName,
        description: visit.description.value,
        date: moment(visit.date).format('DD-MM-YYYY')
    };
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
