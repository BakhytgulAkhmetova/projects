const queryTypeDescription = `
    type Query {
        getAllDescriptions: [Description]
        getDescriptionById( id: String! ): Description!
    }`;

const mutationTypeDescription = `
    type Mutation {
        addDescription( value: String! ): Description
        deleteAllDescrioptions: Int
    }
    `;

module.exports = {
    queryTypeDescription,
    mutationTypeDescription
};
