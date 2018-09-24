import { observable, action, runInAction } from 'mobx';

import { setPatientAge } from '../utils';
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

    @observable patientList = [];//

    @observable count = 0;

    @observable patient = emptyPatient//

    @action
    cleanPatientFields() {
        this.patient = emptyPatient;//
    }

    @action
    setAge() {
        this.patient.age = setPatientAge(this.patient.birthDate);//
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
                console.log(result.data);
                this.patient = result.data.getPatientById;
            });
        } catch (error) {
            return error;
        }
    }

    @action
    async addPatient() {//
        try {
            return await client.mutate({
                mutation: add,
                variables: {
                    firstName: this.patient.firstName,
                    lastName: this.patient.lastName,
                    birthDate: this.patient.birthDate.toDateString(),
                    phoneNumber: this.patient.phoneNumber,
                    email: this.patient.email,
                    gender: this.patient.gender
                },
                fetchPolicy: 'no-cache'
            });
        } catch (error) {
            return error;
        }
    }

    @action
    async editPatient() {//
        try {
            await client.mutate({
                mutation: edit,
                variables: {
                    firstName: this.patient.firstName,
                    lastName: this.patient.lastName,
                    birthDate: this.patient.birthDate,
                    phoneNumber: this.patient.phoneNumber,
                    email: this.patient.email,
                    gender: this.patient.gender,
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
    changePatientField(key, value) {//
        const field = {};

        this.patient[key] = value;
        field[key] = value;
        this.validator.validate(field);
        console.log(this.validator.messages);
    }

    @action
    async getPage() { //
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
