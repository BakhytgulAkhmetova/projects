import { observable, action } from 'mobx';

import { setButtonsCount } from '../utils';

class PaginationStore {
    @observable maxCount = 0

    @observable maxCountView = 0;

    @observable current = 1

    @observable interval = 0;

    @observable start = 0;

    @observable end = 0;

    @action
    setStartButton() {
        if (this.current === 1) {
            this.start = this.current;
        } else {
            this.start = this.current - this.interval;
        }
    }

    @action
    setEndButton() {
        if (this.maxCountView >= this.maxCount) {
            this.end = this.maxCount;
        }
        if (this.maxCountView < this.maxCount) {
            if (this.current === this.maxCount) {
                this.end = this.current;
            } else {
                this.end = this.current + this.interval;
            }
            if (this.current === this.start) {
                this.end = this.maxCountView;
            }
        }
    }

    @action
    setMaxCount(maxCountView, patientsCount) {
        this.maxCount = setButtonsCount(patientsCount, maxCountView);
    }

    @action
    setBaseValues(maxCountView) {
        this.maxCountView = maxCountView;
        this.interval = (maxCountView - 1) / 2;
    }

    @action
    setCurrent(current) {
        this.current = parseInt(current, 10);
    }

    @action
    moveLeft(current) {
        if ((this.current - this.interval) > 1) {
            this.current--;
        }
    }
    @action
    moveRight(current) {
        if ((this.current + this.interval) < this.maxCount) {
            this.current++;
        }
    }
}

export default new PaginationStore();
