/* Including types into schema */
const {
    queryPatient,
    mutationPatient } = require('../graphql/types/patient');
// const {
//     queryVisit,
//     mutationVisit } = require('../graphql/types/visit');

const { customTypes } = require('../graphql/types/customTypes');


const {
    queryResolvers,
    mutationResolvers
} = require('../graphql/resolvers/patient');
const { date } = require('../graphql/resolvers/customTypeResolvers');

const { makeExecutableSchema } = require('graphql-tools');

// const query = {

// }

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
