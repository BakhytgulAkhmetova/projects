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
async function getSelectedPatients({ letters, skip, limit }) {
    let patients = letters ? await Patient.find({ firstName: { $regex: `^${  letters }`, $options: 'i' } }) :
        await Patient.find().skip(skip).limit(limit);

    patients = patients.map((p) => {
        return {
            label: `${p.firstName  }${  p.lastName}`,
            value: p._id
        };
    });

    return patients;
}

/* asynchronous function to get selected doctors from storage*/
async function getSelectedDoctors({ letters, skip, limit }) {
    let doctors = letters ? await Doctor.find({ firstName: { $regex: `^${  letters }`, $options: 'i' } }) :
        await Doctor.find().skip(skip).limit(limit);

    doctors = doctors.map((d) => {
        return {
            label: `${d.firstName  }${  d.lastName}`,
            value: d._id
        };
    });

    return doctors;
}

/* asynchronous function to get selected descriptions from storage*/
async function getSelectedDescriptions({ letters, skip, limit }) {
    let descriptions = letters ? await Description.find({ value: { $regex: `^${  letters }`, $options: 'i' } }) :
        await Description.find().skip(skip).limit(limit);

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

    return  {
        ...visit.toObject(),
        id: visit._id,
        patient: {
            id: visit.patient._id,
            firstName: visit.patient.firstName,
            lastName: visit.patient.lastName
        },
        doctor: {
            id: visit.doctor._id,
            firstName: visit.doctor.firstName,
            lastName: visit.doctor.lastName
        },
        description: {
            id: visit.description._id,
            value: visit.description.value
        }
    };
}

/* asynchronous function to update info about patient in storage by id */
async function updateVisit({ id, date, patientId, doctorId, descriptionId }) {
    const visit = new Visit({
        patient: patientId,
        doctor: doctorId,
        description: descriptionId,
        date
    });

    return await Visit.findByIdAndUpdate(id, visit, { new: true });
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
