import { observable, action } from 'mobx';

class ModalStore {
    @observable title = ''

    @observable content = null

    @observable isOpen = false

    @observable buttons = []

    @action
    open({ title, content, buttons }) {
        this.isOpen = true;
        this.title = title;
        this.content = content;
        this.buttons = buttons;
    }

    @action
    close() {
        this.isOpen = false;
    }
}

export default new ModalStore();
