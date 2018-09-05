const express = require('express');

const add = require('../Handlers/Add');
const getAll = require('../Handlers/GetAll');
const remove = require('../Handlers/Delete');
const getById = require('../Handlers/GetById');
const update = require('../Handlers/Update');
const removeAll = require('../Handlers/DeleteAll');
const getBestStudent = require('../Handlers/GetBestStudent');

const routes = express.Router();

routes.get('/best', (req, res) => {
    getBestStudent(res);
});

routes.get('/:id', (req, res) => {
    getById(req, res);
});

routes.get('/', (req, res) => {
    getAll(req, res);
});

routes.post('/', (req, res) => {
    add(req, res);
});

routes.patch('/:id', (req, res) => {
    update(req, res);
});

routes.delete('/:id', (req, res) => {
    remove(req, res);
});

routes.delete('/', (req, res) => {
    removeAll(req, res);
});

module.exports = routes;
