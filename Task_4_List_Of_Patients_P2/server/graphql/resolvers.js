const {
    addPatient,
    getPatientsPage,
    getPatientById,
    deleteAllPatients,
    updatePatient } = require('../BLL');

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

/* Definition resolve functions for getting data from mongoDB*/
const queryResolvers = {
    getPatientById(parent, args) {
        return getPatientById(args.id);
    },
    getPatientsPage(parent, args) {
        return getPatientsPage(args);
    }
};
/* Definition resolve functions for changing data in mongoDB*/
const mutationResolvers = {
    addPatient(parent, args) {
        return addPatient(args);
    },
    deleteAllPatients() {
        return deleteAllPatients();
    },
    updatePatient(parent, args) {
        return updatePatient(args);
    }
};

/* Definition scalar type Date*/
const date = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    }
});

module.exports = {
    queryResolvers,
    mutationResolvers,
    date
};
