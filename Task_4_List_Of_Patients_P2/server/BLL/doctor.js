const mongoose = require('mongoose');

const Doctor  = require('../mongo/models/doctor');

/* add new doctor in dataBase */
async function addDoctor({ firstName, lastName }) {
    const doctor = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName
    });

    return await doctor.save();
}

/* get all doctors from the dataBase */
async function getAllDoctors() {
    let items = await Doctor.find();

    items = items.map((d) => {
        return { ...d.toObject() };
    });

    return items;
}

/* delete all doctors from the dataBase */
async function deleteAllDoctors() {
    return await Doctor.deleteMany();
}

/* get one doctor from the dataBase by id */
async function getDoctorById(id) {
    return await Doctor.findById(id);
}

module.exports = {
    addDoctor,
    getAllDoctors,
    deleteAllDoctors,
    getDoctorById
};
