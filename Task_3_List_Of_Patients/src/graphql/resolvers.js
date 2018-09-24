const {
    addPatient,
    getPatients,
    getPatientById,
    deleteAll,
    getCount,
    updatePatient } = require('../api/patients');

const resolvers = {
    Query: {
        getPatientById(parent, args) {
            return getPatientById(args.id);
        },
        getPatientCount() {
            return getCount();
        },
        getPatients(parent, args) {
            return getPatients(args);
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
