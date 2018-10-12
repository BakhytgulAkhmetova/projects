const {
    addPatient,
    getPatientsPage,
    getPatientById,
    deleteAllPatients,
    updatePatient } = require('../../BLL');

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

module.exports = {
    queryResolvers,
    mutationResolvers
};
