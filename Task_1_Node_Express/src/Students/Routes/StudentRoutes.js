const express = require('express');
// const add = require('../Handlers/Add');
// const remove = require('../Handlers/Delete');
// const update = require('../Handlers/Update');
const mongoose = require('mongoose');

const Student = require('../DataBase/Model');

const routes = express.Router();

routes.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            console.log(student);
            res.status(200).json({
                message: 'GET student by id completed succesfully',
                student
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: `Not found student with ID :${req.params.id}`
            });
        });
});

routes.get('/', (req, res) => {
    Student.find()
        .then((students) => {
            res.status(200).json({
                message: 'GET students completed succesfully',
                students
            });
        })
        .catch((error) => console.log(error));
});

routes.post('/', (req, res) => {
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
});

routes.patch('/:id', (req, res) => {
    const student = new Student({
        name: req.body.name,
        marks: req.body.marks
    });

    Student.findByIdAndUpdate(req.params.id, student)
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'updated succesfully',
                result
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'Error in updating'
            });
        });
});

routes.delete('/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'deleted succesfully',
                result
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: `Not found student with ID :${req.params.id}`
            });
        });
});

module.exports = routes;
