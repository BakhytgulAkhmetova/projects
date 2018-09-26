const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const {
    addPatient,
    getPage,
    getPatientById,
    deleteAll,
    updatePatient } = require('../api/patients');

const resolvers = {
    /* Definition resolve functions for getting data from mongoDB*/
    Query: {
        getPatientById(parent, args) {
            return getPatientById(args.id);
        },
        getPage(parent, args) {
            
            return getPage(args);
        }
    },
    /* Definition resolve functions for changing data in mongoDB*/
    Mutation: {
        addPatient(parent, args) {
            return addPatient(args);
        },
        deleteAllPatients() {
            return deleteAll();
        },
        updatePatient(parent, args) {
            return updatePatient(args);
        }
    },

    /* Definition scalar type Date*/ 
    Date: new GraphQLScalarType({
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
                return new Date(ast.value) 
            }
            return null;
        }
    }),
}

module.exports = resolvers;
