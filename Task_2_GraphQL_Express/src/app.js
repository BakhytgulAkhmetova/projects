const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const schema = require('./Students/DataBase/Schema');

const app = express();

mongoose.connect('mongodb+srv://node-students:node-students@node-api-students-9wkug.mongodb.net/test?retryWrites=true');

app.use(morgan('dev'));

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

module.exports = app;
