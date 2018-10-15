const {
    addVisit,
    getVisitPage,
    getVisitById,
    deleteAllVisits,
    updateVisit } = require('../../BLL/visit');

/* Definition resolve functions for getting data from mongoDB*/
const queryVisitResolvers = {
    getVisitById(parent, args) {
        return getVisitById(args.id);
    },
    getVisitPage(parent, args) {
        return getVisitPage(args);
    }
};
/* Definition resolve functions for changing data in mongoDB*/
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
