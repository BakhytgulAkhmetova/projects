const { addPatient,
    getPatientsPage,
    getPatientById,
    deleteAllPatients,
    updatePatient } = require('../../BLL/patient');

/* Definition resolve functions to get data from mongoDB*/
const queryPatientResolvers = {
    getPatientById(parent, args) {
        return getPatientById(args.id);
    },
    getPatientsPage(parent, args) {
        return getPatientsPage(args);
    }
};
/* Definition resolve functions to modify data in mongoDB*/
const mutationPatientResolvers = {
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
    queryPatientResolvers,
    mutationPatientResolvers
};
