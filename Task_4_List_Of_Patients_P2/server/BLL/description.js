const mongoose = require('mongoose');

const  Description  = require('../mongo/models/description');

/* add new description in dataBase */
async function addDescription({ value }) {
    const description = new Description({
        _id: new mongoose.Types.ObjectId(),
        value
    });

    return await description.save();
}

/* get all descriptions from  the dataBase */
async function getAllDescriptions() {
    let descriptions = await Description.find();

    descriptions = descriptions.map((d) => {
        return { ...d.toObject() };
    });

    return descriptions;
}

/* delete all descriptions from  the dataBase */
async function deleteAllDescriptions() {
    return await Description.deleteMany();
}

/* get one description from dataBase by id */
async function getDescriptionById(id) {
    return await Description.findById(id);
}

module.exports = {
    addDescription,
    getAllDescriptions,
    deleteAllDescriptions,
    getDescriptionById
};
