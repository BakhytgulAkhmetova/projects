const customTypes = `
    scalar Date

    type Patient {
        _id: String!,
        firstName: String!,
        lastName: String!,
        birthDate: Date!,
        gender: String!,
        phoneNumber: String!,
        email: String!,
        age: Int
    }

    type Doctor {
        _id: String!,
        firstName: String!,
        lastName: String!
    }

    type Description {
        _id: String!,
        value: String!
    }

    type VisitPageItem {
        _id: String!,
        patient: String!,
        doctor: String!,
        description: String!,
        date: Date!
    }

    type Visit {
        _id: String!,
        patientId: String!,
        doctorId: String!,
        descriptionId: String!,
        date: Date!
    }

    type VisitModal {
        _id: String!,
        patient: Patient!,
        doctor: Doctor!,
        description: Description!,
        date: Date!
    }
    
    type Option {
        label: String!,
        value: String!,
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
