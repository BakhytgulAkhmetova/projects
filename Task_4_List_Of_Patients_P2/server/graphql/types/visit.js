const query = `
    type Query {
        getVisitsPage (
            skip: Int!,
            limit: Int!
        ): Page!
        getVisitById(
            id: String!
            ): Visit!
    }`;

const mutation = `
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


const customTypes = `
    scalar Date

    type Visit {
        id: String!,
        patient: String!,
        doctor: String!,
        description: String!,
        date: Date!
    }

    type Page {
        items: [Visit],
        total: Int!
    }`;

module.exports = {
    query,
    mutation,
    customTypes
};

