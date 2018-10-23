const {
    addDoctor,
    getAllDoctors,
    getDoctorById,
    deleteAllDoctors } = require('../../BLL/doctor');

/* Definition resolve functions for getting data from mongoDB*/
const queryDoctorResolvers = {
    getDoctorById(parent, args) {
        return getDoctorById(args.id);
    },
    getAllDoctors() {
        return getAllDoctors();
    }
};
/* Definition resolve functions for changing data in mongoDB*/
const mutationDoctorResolvers = {
    addDoctor(parent, args) {
        return addDoctor(args);
    },
    deleteAllDoctors() {
        return deleteAllDoctors();
    }
};

module.exports = {
    queryDoctorResolvers,
    mutationDoctorResolvers
};
