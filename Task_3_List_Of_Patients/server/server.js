/* import necessary modules for server creation and connecting with mongoDB from node modules*/
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');


const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({ typeDefs, resolvers });

const path = require('./mongo/constants');
mongoose.connect(path, { useNewUrlParser: true });

const app = express();
server.applyMiddleware({ app });

app.listen(4000);