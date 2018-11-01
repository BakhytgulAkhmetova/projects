import { observable, action, runInAction } from 'mobx';
import moment from 'moment';

import { emptyPatient, configPatient, types } from './data/data';
import { addPatient, getPatientById, getPatientsPage, editPatient } from './api/patient';
import { Validator } from '../utils';
import { baseUrl, port, viewitems } from '../constants';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: `${baseUrl + port}/graphql`
});

class PatientStore {
    constructor() {
        this.validator = new Validator({ types, config: configPatient });
    }

    @observable patientList = [];

    @observable count = 0;

    @observable currentPage = 1;

    @observable patient = emptyPatient

    @action
    cleanPatientFields() {
        this.patient = emptyPatient;
    }

    @action
    async getPatientById(id) {
        const result = await client.query({
            query: getPatientById,
            variables: { id },
            fetchPolicy: 'no-cache'
        });

        runInAction(() => {
            const patientFound = result.data.getPatientById;

            this.patient.firstName.value = patientFound.firstName;
            this.patient.lastName.value = patientFound.lastName;
            this.patient.birthDate.value = moment(patientFound.birthDate);
            this.patient.phoneNumber.value = patientFound.phoneNumber;
            this.patient.email.value = patientFound.email;
            this.patient.gender.value = patientFound.gender;
            this.patient.id.value = id;
        });
    }

    @action
    async addPatient(patient) {
        return await client.mutate({
            mutation: addPatient,
            variables: {
                firstName: patient.firstName.value,
                lastName: patient.lastName.value,
                birthDate: patient.birthDate.value,
                phoneNumber: patient.phoneNumber.value,
                email: patient.email.value,
                gender: patient.gender.value
            },
            fetchPolicy: 'no-cache'
        });
    }

    @action
    async editPatient(patient) {
        await client.mutate({
            mutation: editPatient,
            variables: {
                firstName: patient.firstName.value,
                lastName: patient.lastName.value,
                birthDate: patient.birthDate.value,
                phoneNumber: patient.phoneNumber.value,
                email: patient.email.value,
                gender: patient.gender.value,
                id: patient.id.value
            },
            fetchPolicy: 'no-cache'
        });
    }

    @action
    async getPatientsPage(pageNumber) {
        const skip = (pageNumber - 1) * viewitems;
        const result = await client.query({
            query: getPatientsPage,
            variables: {
                skip,
                limit: viewitems
            },
            fetchPolicy: 'no-cache'
        });

        runInAction(() => {
            this.patientList = result.data.getPatientsPage.items;
            this.count = result.data.getPatientsPage.total;
            this.currentPage = pageNumber;
        });
    }
}

export default new PatientStore();
