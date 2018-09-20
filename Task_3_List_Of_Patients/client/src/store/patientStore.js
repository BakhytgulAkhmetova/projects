import { observable, action } from 'mobx';
import uniqid from 'uniqid';

import { setPatientAge } from '../utils';
import { data, emptyPatient } from './data';

class PatientStore {
    constructor() {
        this.fixViewCount = 4;
    }
    @observable patientList = [];// fakeDB

    @observable patientListView = []

    @observable viewStart = 0

    @observable viewEnd = 4

    @observable currentPage = 1


    @observable patient = emptyPatient

    @action
    cleanPatientFields() {
        this.patient = emptyPatient;
    }

    @action
    setAge() {
        this.patient.age = setPatientAge(this.patient.birthDate);
    }

    @action
    setViewValues(number) {
        this.viewStart = number * this.fixViewCount - this.fixViewCount;
        this.currentPage = number;
        this.viewEnd = this.viewStart + this.fixViewCount;
        if (this.viewEnd > this.patientList.length) {
            this.viewEnd = this.patientList.length;
        }

        console.log(this.viewStart);
        console.log(this.viewEnd);
    }

    @action
    setPatientListView() {
        this.patientListView = [];


        for (let i = this.viewStart; i < this.viewEnd; i++) {
            this.patientListView.push(this.patientList[i]);
        }
    }

    @action
    get(id) {
        this.patient = this.patientList.find(p => {
            if (p.id === id) {
                return p;
            }
            return null;
        });
    }

    @action
    addPatient() {
        this.patient.id = uniqid();
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
