/* import necessary modules for server creation and connecting with mongoDB from node modules*/
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');


const typeDefs = require('./src/graphql/types');
const resolvers = require('./src/graphql/resolvers');
const server = new ApolloServer({ typeDefs, resolvers });

const path = require('./src/mongo/constants/constantsPatient');
mongoose.connect(path, { useNewUrlParser: true });

const app = express();
server.applyMiddleware({ app });



app.listen(4000);