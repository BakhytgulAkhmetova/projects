const queryVisit = `
    type Query {
        getVisitsPage (
            skip: Int!,
            limit: Int!
        ): VisitPage!
        getVisitById(
            id: String!
            ): Visit!
    }`;

const mutationVisit = `
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
    queryVisit,
    mutationVisit
};

