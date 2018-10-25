import { observable, action, runInAction } from 'mobx';

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

    @observable errorsPatient = [];

    @observable isInValidPatient = true;

    @observable patient = emptyPatient

    @action
    cleanPatientFields() {
        this.patient = emptyPatient;
    }

    @action
    setIsValid() {
        for (const prop in this.patient) {
            if (this.patient.hasOwnProperty(prop) && typeof this.patient[prop] === 'object') {
                if (this.patient[prop].errors.length) {
                    this.errorsPatient.push(this.patient[prop].errors);
                }
            }
        }

        if (this.errorsPatient.length) {
            this.isInValidPatient = true;
        } else {
            this.isInValidPatient = false;
        }
        this.errorsPatient = [];
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
            this.patient.birthDate.value = new Date(patientFound.birthDate);
            this.patient.phoneNumber.value = patientFound.phoneNumber;
            this.patient.email.value = patientFound.email;
            this.patient.gender.value = patientFound.gender;
            this.patient.id.value = id;

            this.isInValidPatient = false;
        });
    }

    @action
    async addPatient() {
        this.isInValidPatient = true;
        return await client.mutate({
            mutation: addPatient,
            variables: {
                firstName: this.patient.firstName.value,
                lastName: this.patient.lastName.value,
                birthDate: this.patient.birthDate.value,
                phoneNumber: this.patient.phoneNumber.value,
                email: this.patient.email.value,
                gender: this.patient.gender.value
            },
            fetchPolicy: 'no-cache'
        });
    }

    @action
    async editPatient() {
        await client.mutate({
            mutation: editPatient,
            variables: {
                firstName: this.patient.firstName.value,
                lastName: this.patient.lastName.value,
                birthDate: this.patient.birthDate.value,
                phoneNumber: this.patient.phoneNumber.value,
                email: this.patient.email.value,
                gender: this.patient.gender.value,
                id: this.patient.id.value
            },
            fetchPolicy: 'no-cache'
        });
    }

    @action
    changePatientField(key, value) {
        this.patient[key].value = value;
        this.validator.validate(this.patient);
        const errors = this.validator.listErrors;

        for (let i = 0; i < errors.length; i++) {
            const prop = errors[i].prop;

            this.patient[prop] = {
                ...this.patient[prop],
                errors: errors[i].msgs
            };
        }
        this.setIsValid();
        this.validator.cleanListErrors();
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
