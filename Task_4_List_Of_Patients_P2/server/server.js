/* import necessary modules for server creation and connecting with mongoDB from node modules*/
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./graphql/schema');
const server = new ApolloServer({ schema });

const { MONGO_CONNECTION_STRING } = require('./mongo/constants');

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });

const app = express();

server.applyMiddleware({ app });

app.listen(4000);
