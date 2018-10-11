const {
    queryPatient,
    mutationPatient } = require('../graphql/types/patient');

const { customTypes } = require('../graphql/types/customTypes');

const {
    queryResolvers,
    mutationResolvers,
    date
} = require('../graphql/resolvers/patient');

const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({
    typeDefs: [
        queryPatient,
        mutationPatient,
        customTypes
    ],
    resolvers: {
        Query: queryResolvers,
        Mutation: mutationResolvers,
        Date: date
    }
});

module.exports = schema;
