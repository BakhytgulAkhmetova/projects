const mongoose = require('mongoose');

const Description = require('../mongo/models/description');

/* asynchronous function to add new description in storage */
async function addDescription({ value }) {
    const description = new Description({
        _id: new mongoose.Types.ObjectId(),
        value
    });

    return await description.save();
}

/* asynchronous function to get all descriptions from  the storage */
async function getAllDescriptions() {
    let descriptions = await Description.find();

    descriptions = descriptions.map((d) => {
        return {
            ...d.toObject(),
            id: d._id };
    });

    return descriptions;
}

/* asynchronous function to delete all descriptions from  the storage */
async function deleteAllDescriptions() {
    return await Description.deleteMany();
}

/* asynchronous function to get one description from storage by id */
async function getDescriptionById(id) {
    return await Description.findById(id);
}

module.exports = {
    addDescription,
    getAllDescriptions,
    deleteAllDescriptions,
    getDescriptionById
};
