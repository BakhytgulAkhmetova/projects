const mongoose = require('mongoose');

const Doctor  = require('../mongo/models/doctor');

/* asynchronous function to add new doctor in storage */
async function addDoctor({ firstName, lastName }) {
    const doctor = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName
    });

    return await doctor.save();
}

/* asynchronous function to get all doctors from the storage */
async function getAllDoctors() {
    let items = await Doctor.find();

    items = items.map((d) => {
        return {
            ...d.toObject(),
            id: d._id };
    });

    return items;
}

/* asynchronous function to delete all doctors from the storage */
async function deleteAllDoctors() {
    return await Doctor.deleteMany();
}

/* asynchronous function to get one doctor from the storage by id */
async function getDoctorById(id) {
    return await Doctor.findById(id);
}

module.exports = {
    addDoctor,
    getAllDoctors,
    deleteAllDoctors,
    getDoctorById
};
