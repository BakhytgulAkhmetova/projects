import { observable, action } from 'mobx';

class MaskStore {
    @observable isOpen = false

    @action
    open() {
        this.isOpen = !this.isOpen;
    }

    @action
    close() {
        this.isOpen = !this.isOpen;
    }
}

export default new MaskStore();
