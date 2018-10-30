import { observable, action } from 'mobx';

class ModalStore {
    @observable title = ''

    @observable content = null

    @observable isOpen = false

    @action
    open({ title, content, buttons }) {
        this.isOpen = true;
        this.title = title;
        this.content = content;
    }

    @action
    close() {
        this.isOpen = false;
    }
}

export default new ModalStore();
