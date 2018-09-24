const {
    addPatient,
    getPage,
    getPatientById,
    deleteAll,
    updatePatient } = require('../api/patients');

const resolvers = {
    Query: {
        getPatientById(parent, args) {
            return getPatientById(args.id);
        },
        getPage(parent, args) {
            return getPage(args);
        }
    },
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
    }
}

module.exports = resolvers;
