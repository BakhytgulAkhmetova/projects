const mongoose = require('mongoose');
const moment = require('moment');

const  Visit  = require('../mongo/models/visit');
const description = require('../mongo/data/description');
const doctor = require('../mongo/data/doctor');

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

/* asynchronous function to get all patients from storage*/
async function getVisitPage({ skip, limit }) {
    try {
        let items = await Visit.find().skip(skip).limit(limit);
        const total = await Visit.find().estimatedDocumentCount();

        items = items.map((p) => {
            return {
                ...p.toObject(),
                id: p._id.toString(),
                age: moment.utc(new Date()).diff(moment.utc(p.birthDate), 'years')
            };
        });
        return { items, total };
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
    getVisitPage,
    getVisitById,
    updateVisit,
    deleteAllVisits
};
