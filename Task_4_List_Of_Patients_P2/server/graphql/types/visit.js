const queryTypeVisit = `
    type Query {
        getSelectedPatients (
            letters: String!
        ): [Selected]
        getSelectedDoctors(
            letters: String!
        ): [Selected]
        getSelectedDescriptions(
            letters: String!
        ): [Selected]
        getVisitById(
            id: String!
            ): Visit!
        getVisitsPage(
            skip: Int!,
            limit: Int!
        ): VisitPage!
    }`;

const mutationTypeVisit = `
    type Mutation {
        addVisit(
            patientId: String!,
            doctorId: String!,
            descriptionId: String!,
            date: Date!
        ): Visit
        updateVisit(
            patientId: String!,
            doctorId: String!,
            descriptionId: String!,
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
