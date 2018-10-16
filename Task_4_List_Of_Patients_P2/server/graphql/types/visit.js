const queryTypeVisit = `
    type Query {
        getSelectedPatients (
            letters: String!
        ): [SelectPatient]
        getSelectedDoctors(
            letters: String!
        ): [Doctor]
        getSelectedDescriptions(
            letters: String!
        ): [Description]
        getVisitById(
            id: String!
            ): Visit!
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
