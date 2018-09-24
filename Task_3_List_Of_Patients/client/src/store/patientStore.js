import { observable, action, runInAction } from 'mobx';
import gql from 'graphql-tag';

import { setPatientAge } from '../utils';
import { emptyPatient } from './data';
import { buttonStore } from '../store';
import { add, getAll, edit, getById } from './queries';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

class PatientStore {
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
            debugger;
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
            return await client.mutate({
                mutation: edit,
                variables: {
                    firstName: this.patient.firstName,
                    lastName: this.patient.lastName,
                    birthDate: this.patient.birthDate.toDateString(),
                    phoneNumber: this.patient.phoneNumber,
                    email: this.patient.email,
                    gender: this.patient.gender,
                    id: this.patient.id
                },
                fetchPolicy: 'no-cache'
            });
        } catch (error) {
            return error;
        }
    }

    @action
    changePatientField(key, value) {//
        this.patient[key] = value;
    }

    @action
    async setPatientCount() {
        try {
            const result = await client.query({
                query: gql`
                query{ getPatientCount }`,
                fetchPolicy: 'no-cache'
            });

            runInAction(() => {
                this.count = result.data.getPatientCount;
                buttonStore.setButtonsViewList(this.count);
            });
        } catch (error) {
            return error;
        }
    }

    @action
    async getAll() { //
        try {
            const skip = (buttonStore.current - 1) * 4;
            const result = await client.query({
                query: getAll,
                variables: {
                    skip,
                    limit: 4
                },
                fetchPolicy: 'no-cache'
            });

            runInAction(() => {
                this.patientList = result.data.getPatients;
            });
        } catch (error) {
            return error;
        }
    }
}

export default new PatientStore();
