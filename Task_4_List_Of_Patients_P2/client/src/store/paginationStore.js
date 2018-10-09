import { observable, action } from 'mobx';

import { setButtonsCount } from '../utils';

class PaginationStore {
  @observable
  maxCount = 0;

  @observable
  maxCountView = 0;

  @observable
  current = 1;

  @observable
  interval = 0;

  @observable
  start = 0;

  @observable
  end = 0;

  @action
  setStartEndbuttons() {
      if (this.maxCount > this.maxCountView) {
          if (this.current !== this.maxCount) {
              if (this.current !== 1) {
                  this.start = this.current - this.interval;
                  this.end = this.current + this.interval;
              } else {
                  this.start = 1;
                  this.end = this.maxCountView;
              }
          }
      } else {
          this.start = 1;
          this.end = this.maxCount;
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
  moveLeft() {
      if (this.current - this.interval !== -1) {
          this.current = this.start;
      }
  }
  @action
  moveRight() {
      this.current = this.end;
  }
}

export default new PaginationStore();
