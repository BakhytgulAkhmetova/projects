import { observable, action } from 'mobx';

import { setButtonsCount } from '../utils';

class PaginationStore {
    constructor() {
        this.fixView = 3;
    }
    @observable buttonListView = []

    @observable count = 0

    @observable current = 1

    @observable move = {
        back: true,
        forward: false
    }

    @observable viewStart = 1

    @observable viewEnd = 3

    @action
    setButtonsViewList(patientsCount) {
        /* get count of all buttons*/
        this.count = setButtonsCount(patientsCount, 4);

        /* creation buttons for view */
        this.buttonListView = [];

        if (this.count > this.fixView) {
            if (this.viewStart === 1) {
                this.viewEnd = this.fixView;
            }
        } else {
            this.viewEnd = this.count;
        }

        for (let i = this.viewStart; i <= this.viewEnd; i++) {
            this.buttonListView.push({ number: i });
        }
    }

    @action
    setMove(id) {
        switch (parseFloat(id) === 1) {
            case true:
                this.move.back = true;
                this.move.forward = false;
                break;

            case false:
                this.move.back = false;
                this.move.forward = true;
                break;

            default:
                break;
        }
    }

    @action
    changeViewButtons() {
        switch (this.move.forward) {
            case true:
                if (this.viewEnd < this.count) {
                    this.viewEnd++;
                    this.viewStart++;
                }
                break;

            case false:
                if (this.viewStart > 1) {
                    this.viewStart--;
                    this.viewEnd--;
                }
                break;

            default:
                break;
        }
        this.buttonListView = [];

        for (let i = this.viewStart; i <= this.viewEnd; i++) {
            this.buttonListView.push({ number: i });
        }
    }
}

export default new PaginationStore();
