const {
    addDescription,
    getAllDescriptions,
    getDescriptionById,
    deleteAllDescriptions } = require('../../BLL/description');

/* Definition resolve functions for getting data from mongoDB*/
const queryDescriptionResolvers = {
    getDescriptionById(parent, args) {
        return getDescriptionById(args.id);
    },
    getAllDescriptions() {
        return getAllDescriptions();
    }
};
/* Definition resolve functions for changing data in mongoDB*/
const mutationDescriptionResolvers = {
    addDescription(parent, args) {
        return addDescription(args);
    },
    deleteAllDescrioptions() {
        return deleteAllDescriptions();
    }
};

module.exports = {
    queryDescriptionResolvers,
    mutationDescriptionResolvers
};
