import { observable, action, runInAction } from 'mobx';

import { emptyPatient, config, types } from './data';
import { buttonStore } from '../store';
import { add, getPage, edit, getById } from './queries';
import { Validator } from '../utils';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

class PatientStore {
    constructor() {
        this.validator = new Validator({ types, config });
    }

    @observable patientList = [];

    @observable count = 0;

    @observable patient = emptyPatient

    @action
    cleanPatientFields() {
        this.patient = emptyPatient;
    }

    @action
    async get(id) {
        try {
            const result = await client.query({
                query: getById,
                variables: { id },
                fetchPolicy: 'no-cache'
            });

            runInAction(() => {
                this.patient = result.data.getPatientById;

                // this.patient.firstName.value = patientFound.firstName;
                // this.patient.lastName.value = patientFound.lastName;
                // this.patient.birthDate.value = patientFound.birthDate;
                // this.patient.phoneNumber = patientFound.phoneNumber;
                // this.patient.email = patientFound.email;
                // this.patient.id = patientFound.id;

                console.log(this.patient);
            });
        } catch (error) {
            runInAction(() => {
                return error;
            });
        }
    }

    @action
    async addPatient() {
        try {
            return await client.mutate({
                mutation: add,
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
        } catch (error) {
            runInAction(() => {
                return error;
            });
        }
    }

    @action
    async editPatient() {
        try {
            await client.mutate({
                mutation: edit,
                variables: {
                    firstName: this.patient.firstName.value,
                    lastName: this.patient.lastName.value,
                    birthDate: this.patient.birthDate.value,
                    phoneNumber: this.patient.phoneNumber.value,
                    email: this.patient.email.value,
                    gender: this.patient.gender.value,
                    id: this.patient.id
                },
                fetchPolicy: 'no-cache'
            });
        } catch (error) {
            runInAction(() => {
                return error;
            });
        }
    }

    @action
    changePatientField(key, value) {
        const field = {};

        field[key] = value;
        this.validator.validate(field);
        this.patient[key].errors = this.validator.messages;
        this.patient[key].value = value;
    }

    @action
    async getPage() {
        try {
            const skip = (buttonStore.current - 1) * 4;
            const result = await client.query({
                query: getPage,
                variables: {
                    skip,
                    limit: 4
                },
                fetchPolicy: 'no-cache'
            });

            runInAction(() => {
                this.patientList = result.data.getPage.items;
                this.count = result.data.getPage.total;
                buttonStore.setButtonsViewList(this.count);
            });
        } catch (error) {
            runInAction(() => {
                return error;
            });
        }
    }
}

export default new PatientStore();
