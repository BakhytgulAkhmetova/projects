import { observable, action, runInAction } from 'mobx';

import { emptyPatient, config, types } from './data';
import { paginationStore } from '../store';
import { add, getPage, edit, getById } from './queries';
import { Validator } from '../utils';
import { baseUrl, port } from '../constants';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: `${baseUrl + port}/graphql`
});

class PatientStore {
    constructor() {
        this.validator = new Validator({ types, config });
    }

    @observable patientList = [];

    @observable count = 0;

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
    async get(id) {
        try {
            const result = await client.query({
                query: getById,
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
        } catch (error) {
            runInAction(() => {
                return error;
            });
        }
    }

    @action
    async addPatient() {
        this.isInValidPatient = true;
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
                    id: this.patient.id.value
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
    async getPage() {
        try {
            const skip = (paginationStore.current - 1) * 4;
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
            });
        } catch (error) {
            runInAction(() => {
                return error;
            });
        }
    }
}

export default new PatientStore();
