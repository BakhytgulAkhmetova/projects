const mongoose = require('mongoose');

const Student = require('../DataBase/Model');

const add = (req, res) => {
    const student = new Student({
        name: req.body.name || 'Ivan',
        _id: new mongoose.Types.ObjectId(),
        marks: req.body.marks || []
    });

    student.save()
        .then(() => {
            res.status(200).json({
                message: `Student ${ student.name } added successfully`
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: `Operation adding completed unsuccessfully (${  error})`
            });
        });
};

module.exports = add;
