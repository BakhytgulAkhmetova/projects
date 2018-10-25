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
            ): VisitViewItem!
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
