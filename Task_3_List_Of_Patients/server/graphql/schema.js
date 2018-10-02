const {
    query,
    mutation,
    customTypes
} = require('./types');

const {
    queryResolvers,
    mutationResolvers,
    date
} = require('./resolvers');

const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({
    typeDefs: [
        query,
        mutation,
        customTypes
    ],
    resolvers: {
        Query: queryResolvers,
        Mutation: mutationResolvers,
        Date: date
    }
});

module.exports = schema;
