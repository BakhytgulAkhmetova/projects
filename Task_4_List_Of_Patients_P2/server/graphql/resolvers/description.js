const { addDescription,
    getAllDescriptions,
    getDescriptionById,
    deleteAllDescriptions } = require('../../BLL/description');

/* Definition resolve functions to get data from mongoDB*/
const queryDescriptionResolvers = {
    getDescriptionById(parent, args) {
        return getDescriptionById(args.id);
    },
    getAllDescriptions() {
        return getAllDescriptions();
    }
};
/* Definition resolve functions to modify data in mongoDB*/
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
