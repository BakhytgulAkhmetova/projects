const mongoose = require('mongoose');

const Student = require('../DataBase/Model');

const add = (req, res) => {
    const student = new Student({
        name: req.body.name,
        _id: new mongoose.Types.ObjectId(),
        marks: []
    });

    student.save()
        .then((result) => (console.log(result)))
        .catch((error) => console.log(error));

    res.status(200).json({
        message: 'Student added succesfully'
    });
};

module.exports = add;
