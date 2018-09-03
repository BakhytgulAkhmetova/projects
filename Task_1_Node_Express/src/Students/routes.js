const express = require('express');
const routes = express.Router();
const dbStudents = require('./DataBase/students');
const add = require('../Students/Handlers/Add');
const remove = require('../Students/Handlers/Delete');
const update = require('../Students/Handlers/Update');

let id = 1;

routes.get('/', (req, res, next) => (
    res.status(200).json({
        message: 'GET students completed succesfully',
        students: dbStudents
    })
));

routes.post('/', (req, res, next) => {
    add(req, id, dbStudents);
    id++;
    res.status(200).json({
        message: 'Student added succesfully',
    })
});

routes.patch('/:id', (req, res, next) => {
    const name = req.body.name;
    const marks = req.body.marks;
    const id = req.params.id;
    dbStudents = update(id, {name, marks}, dbStudents);
    res.status(200).json({
        message: 'Student updated succesfully',
    })
});

routes.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    remove(id, dbStudents);
    res.status(200).json({
        message: 'Student deleted'
    })
});

module.exports = routes;