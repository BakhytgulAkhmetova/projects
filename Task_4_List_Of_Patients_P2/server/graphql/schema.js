/* Merge types and defs modules */
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');

/* Types for schema */
const { queryTypePatient, mutationTypePatient } = require('../graphql/types/patient');
const { queryTypeVisit, mutationTypeVisit } = require('../graphql/types/visit');
const { queryTypeDoctor, mutationTypeDoctor } = require('../graphql/types/doctor');
const { queryTypeDescription, mutationTypeDescription } = require('../graphql/types/description');
const { customTypes } = require('../graphql/types/customTypes');

/* Resolvers for schema */
const { queryPatientResolvers,  mutationPatientResolvers } = require('../graphql/resolvers/patient');
const { queryVisitResolvers,  mutationVisitResolvers } = require('../graphql/resolvers/visit');
const { queryDoctorResolvers,  mutationDoctorResolvers } = require('../graphql/resolvers/doctor');
const { queryDescriptionResolvers,  mutationDescriptionResolvers } = require('../graphql/resolvers/description');
const { date } = require('../graphql/resolvers/customTypeResolvers');

const typeDefs = mergeTypes([
    queryTypePatient,
    queryTypeDoctor,
    queryTypeDescription,
    queryTypeVisit,
    mutationTypePatient,
    mutationTypeDoctor,
    mutationTypeDescription,
    mutationTypeVisit,
    customTypes
]);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: mergeResolvers([queryPatientResolvers, queryVisitResolvers, queryDoctorResolvers, queryDescriptionResolvers]),
        Mutation: mergeResolvers([mutationPatientResolvers, mutationVisitResolvers, mutationDoctorResolvers, mutationDescriptionResolvers]),
        Date: date
    }
});

module.exports = schema;
