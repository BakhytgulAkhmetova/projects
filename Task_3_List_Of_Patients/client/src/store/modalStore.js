import { observable, action } from 'mobx';

class ModalStore {
    @observable title = 'Add patient'
    @observable content = {
        firstName: '',
        lastName: '',
        birthDate: new Date(0, 0, 0).toLocaleDateString,
        age: 0,
        genderList: [{
            choosen: true,
            id:1,
            value: 'Male'
        },
        {
            choosen: false,
            id: 2,
            value: 'Female'
        }],
        phoneNumber: '',
        emailAdress: ''
    }

    @observable isOpen = false

    @action
    open(title, content, buttons) {
        this.title = title;
        this.content = content;
        this.buttons = buttons;
    }
}

export default new ModalStore();
