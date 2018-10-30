const customTypes = `
    scalar Date

    type Patient {
        id: String!,
        firstName: String!,
        lastName: String!,
        birthDate: Date!,
        gender: String!,
        phoneNumber: String!,
        email: String!,
        age: Int
    }

    type Selected {
        label: String!,
        value: String!,
    }

    type Doctor {
        id: String!,
        firstName: String!,
        lastName: String!
    }

    type Description {
        id: String!,
        value: String!
    }

    type VisitPageItem {
        id: String!,
        patient: String!,
        doctor: String!,
        description: String!,
        date: Date!
    }

    type Visit {
        id: String!,
        patientId: String!,
        doctorId: String!,
        descriptionId: String!,
        date: Date!
    }

    type VisitModal {
        id: String!,
        patient: Patient!,
        doctor: Doctor!,
        description: Description!,
        date: Date!
    }

    type VisitPage {
        items: [VisitPageItem],
        total: Int!
    }

    type PatientPage {
        items: [Patient],
        total: Int!
    }`;

module.exports = {
    customTypes
};
