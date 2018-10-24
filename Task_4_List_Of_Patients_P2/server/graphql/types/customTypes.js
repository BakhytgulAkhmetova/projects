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

    type Visit {
        id: String!,
        patientId: String !,
        doctorId: String!,
        descriptionId: String!,
        date: String!
    }

    type VisitPageItem {
        id: String!,
        patient: Patient !,
        doctor: Doctor!,
        description: Description!,
        date: String!
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
