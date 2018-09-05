const express = require('express');
const routes = require('../src/Students/Routes/StudentRoutes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://node-students:node-students@node-api-students-9wkug.mongodb.net/test?retryWrites=true', {
    useMongoClient: true
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/students', routes);
app.use((req, res, next) => {
    const error = new Error('Not found this query!');

    res.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.json({
        message: err.message
    });
    next();
});

module.exports = app;
