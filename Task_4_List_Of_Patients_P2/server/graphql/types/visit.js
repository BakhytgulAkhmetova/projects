const queryTypeVisit = `
    type Query {
        getSelectedPatients (
            firstName: String!
        ): [Patient]
        getVisitById(
            id: String!
            ): Visit!
    }`;

const mutationTypeVisit = `
    type Mutation {
        addVisit(
            patient: String!,
            doctor: String!,
            description: String!,
            date: Date!
        ): Visit
        updateVisit(
            patient: String!,
            doctor: String!,
            description: String!,
            date: Date!
            id: String!
        ): Visit
        deleteAllVisits: Int
    }
    `;

module.exports = {
    queryTypeVisit,
    mutationTypeVisit
};
