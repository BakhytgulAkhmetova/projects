const mongoose = require('mongoose');
const moment = require('moment');

/* import models from database */
const Visit  = require('../mongo/models/visit');
const Patient = require('../mongo/models/patient');
const Description = require('../mongo/models/description');
const Doctor = require('../mongo/models/doctor');

/* add visit to dataBase */
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

/* get visits from dataBase */
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
            patient: item.patient.firstName + item.patient.lastName,
            doctor: item.doctor.firstName + item.doctor.lastName,
            description: item.description.value,
            date: moment(item.date).format('DD-MM-YYYY')
        };
    });

    return { items, total };
}

/* get selected patients from dataBase */
async function getSelectedPatients({ letters, skip, limit }) {
    let patients = letters ? await Patient.find({ firstName: { $regex: `^${  letters }`, $options: 'i' } }) :
        await Patient.find().skip(skip).limit(limit);

    patients = patients.map((p) => {
        return { label: `${p.firstName  }${  p.lastName}`, value: p._id };
    });

    return patients;
}

/* get selected doctors from dataBase*/
async function getSelectedDoctors({ letters, skip, limit }) {
    let doctors = letters ? await Doctor.find({ firstName: { $regex: `^${  letters }`, $options: 'i' } }) :
        await Doctor.find().skip(skip).limit(limit);

    doctors = doctors.map((d) => {
        return { label: `${d.firstName  }${  d.lastName}`, value: d._id };
    });

    return doctors;
}

/* get selected descriptions from dataBase*/
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

/* delete visits from dataBase*/
async function deleteAllVisits() {
    return await Visit.deleteMany();
}

/* get one visit from dataBase by id */
async function getVisitById(id) {
    const visit =  await Visit.findById(id)
        .populate('patient')
        .populate('doctor')
        .populate('description');

    return  {
        ...visit.toObject(),
        patient: {
            _id: visit.patient._id,
            firstName: visit.patient.firstName,
            lastName: visit.patient.lastName
        },
        doctor: {
            _id: visit.doctor._id,
            firstName: visit.doctor.firstName,
            lastName: visit.doctor.lastName
        },
        description: {
            _id: visit.description._id,
            value: visit.description.value
        }
    };
}

/* update visit in dataBase */
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
