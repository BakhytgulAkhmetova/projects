const mongoose = require('mongoose');

const Student = require('../../MongoDB/Model');

const add = (args) => {
    const student = new Student({
        name: args.name || 'Ivan',
        _id: new mongoose.Types.ObjectId(),
        marks: args.marks || []
    });

    return student.save()
        .then((doc) => {
            return doc;
        })
        .catch((error) => {
            return error;
        });
};

module.exports = add;
