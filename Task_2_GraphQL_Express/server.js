/* import necessary modules for server creation and connecting with mongoDB from node modules*/
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

/* import own modules for graphQL schema creation and path for connection with mongoDB cluster */
const typeDefs = require('./src/GraphQL/Types');
const resolvers = require('./src/GraphQL/Resolvers');
const path  = require('./src/MongoDB/Constants');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.use(morgan('dev'));
server.applyMiddleware({ app });

mongoose.connect(path, {
    useNewUrlParser: true
});

app.listen(3000);
