import { observable, action } from 'mobx';

import { data } from './data';

const genders = {
    male: 'Male',
    female: 'Female'
};

class PatientStore {
    @observable patientList = [];

    @observable patient = {
        firstName: '',
        id: -1,
        lastName: '',
        birthDate: new Date(0, 0, 0).toLocaleDateString,
        gender: genders.male,
        phoneNumber: '',
        email: ''
    }

    @action
    get(id) {
        console.log(id);
        this.patient = this.patientList.find(p => {
            if (parseFloat(p.id)  === parseFloat(id)) {
                return p;
            }
            return null;
        });
    }

    @action
    addPatient() {
        this.patientList.push(this.patient);
    }

    @action
    editPatient() {
        const index = this.patientList.findIndex(item => {
            return item.id === this.patient.id;
        });

        this.patientList = [
            ...this.patientList.slice(0, index),
            this.patientList[index] = this.patient,
            ...this.patientList.slice(index + 1)
        ];
    }

    @action
    changePatientField(key, value) {
        this.patient[key] = value;
    }

    @action
    getAll() {
        this.patientList = data.patientList;
    }
}

export default new PatientStore();
