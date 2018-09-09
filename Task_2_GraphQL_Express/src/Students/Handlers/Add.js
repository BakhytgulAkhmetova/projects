const mongoose = require('mongoose');

const Student = require('../../MongoDB/Model');

const add = (args) => {
    const student = new Student({
        name: args.name || 'Ivan',
        _id: new mongoose.Types.ObjectId(),
        marks: args.marks || []
    });

    return student.save();
    // .then(() => {
    //     res.status(200).json({
    //         message: `Student ${ student.name } added successfully`
    //     });
    // })
    // .catch((error) => {
    //     res.status(500).json({
    //         message: `Operation adding completed unsuccessfully (${  error})`
    //     });
    // });
};

module.exports = add;
