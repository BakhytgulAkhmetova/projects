/* Including types into schema */
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');

const { queryTypePatient, mutationTypePatient } = require('../graphql/types/patient');
const { queryTypeVisit, mutationTypeVisit } = require('../graphql/types/visit');
const { customTypes } = require('../graphql/types/customTypes');
const { queryPatientResolvers,  mutationPatientResolvers } = require('../graphql/resolvers/patient');
const { queryVisitResolvers,  mutationVisitResolvers } = require('../graphql/resolvers/visit');
const { date } = require('../graphql/resolvers/customTypeResolvers');

const typeDefs = mergeTypes([
    queryTypePatient,
    queryTypeVisit,
    mutationTypePatient,
    mutationTypeVisit,
    customTypes
], { all: true });

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: mergeResolvers([ queryPatientResolvers, queryVisitResolvers]),
        Mutation: mergeResolvers([mutationPatientResolvers, mutationVisitResolvers]),
        Date: date
    }
});

module.exports = schema;
