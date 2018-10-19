const mongoose = require('mongoose');

const Visit  = require('../mongo/models/visit');
const Patient = require('../mongo/models/patient');
const Description = require('../mongo/models/description');
const Doctor = require('../mongo/models/doctor');

console.log(Doctor);

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
