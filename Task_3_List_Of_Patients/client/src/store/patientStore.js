import { observable, action } from 'mobx';

import { data } from './data';

class PatientStore {
    @observable data = {
        patientList: []
    };

    @action
    getAll() {
        this.data = data;
    }
}

export default new PatientStore();
