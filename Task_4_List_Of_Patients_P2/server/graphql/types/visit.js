const queryTypeVisit = `
    type Query {
        getVisitPage (
            skip: Int!,
            limit: Int!
        ): VisitPage!
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
