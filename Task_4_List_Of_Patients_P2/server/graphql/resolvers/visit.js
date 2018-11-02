const { addVisit,
    getSelectedPatients,
    getSelectedDoctors,
    getSelectedDescriptions,
    getVisitById,
    deleteAllVisits,
    getVisitsPage,
    updateVisit } = require('../../BLL/visit');

/* Definition resolve functions to get data from mongoDB*/
const queryVisitResolvers = {
    getVisitById(parent, args) {
        return getVisitById(args.id);
    },
    getSelectedPatients(parent, args) {
        return getSelectedPatients(args);
    },
    getSelectedDoctors(parent, args) {
        return getSelectedDoctors(args);
    },
    getSelectedDescriptions(parent, args) {
        return getSelectedDescriptions(args);
    },
    getVisitsPage(parent, args) {
        return getVisitsPage(args);
    }
};

/* Definition resolve functions to modify data in mongoDB*/
const mutationVisitResolvers = {
    addVisit(parent, args) {
        return addVisit(args);
    },
    deleteAllVisits() {
        return deleteAllVisits();
    },
    updateVisit(parent, args) {
        return updateVisit(args);
    }
};

module.exports = {
    queryVisitResolvers,
    mutationVisitResolvers
};
