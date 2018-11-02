const queryTypeVisit = `
    type Query {
        getSelectedPatients (letters: String!, skip: Int!, limit: Int!): [Option]
        getSelectedDoctors( letters: String!, skip: Int!, limit: Int!): [Option]
        getSelectedDescriptions(letters: String!, skip: Int!, limit: Int!): [Option]
        getVisitById(id: String!): VisitModal!
        getVisitsPage(skip: Int!, limit: Int!): VisitPage!
    }`;

const mutationTypeVisit = `
type Mutation {
        addVisit(patientId: String!,
            doctorId: String!,
            descriptionId: String!,
            date: Date!): Visit
        updateVisit(patientId: String!,
            doctorId: String!,
            descriptionId: String!,
            date: Date!
            id: String!): Visit
        deleteAllVisits: Int 
    } `;

module.exports = {
    queryTypeVisit,
    mutationTypeVisit
};
