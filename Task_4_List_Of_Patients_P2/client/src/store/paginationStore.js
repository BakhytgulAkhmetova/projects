import { observable, action } from 'mobx';

import { setButtonsCount } from '../utils';

class PaginationStore {
  @observable
  maxVisibleButtons = 1;

  min = 1;

  @observable
  pagesCount = 0;

  @observable
  currentPage = 1;

  @observable
  interval = 0;

  @observable
  firstVisibleButton = this.min;

  @observable
  lastVisibleButton = 0;

  @action
  setStartEndbuttons(current) {
      this.currentPage = +current;
      this.firstVisibleButton = this.currentPage - this.interval;
      this.lastVisibleButton = this.currentPage + this.interval;

      if (this.firstVisibleButton <= 0) {
          this.firstVisibleButton = this.min;
          if (this.pagesCount <= this.maxVisibleButtons) {
              this.lastVisibleButton = this.pagesCount;
          } else {
              this.lastVisibleButton = this.maxVisibleButtons;
          }
      } else if (this.lastVisibleButton >= this.pagesCount) {
          this.lastVisibleButton = this.pagesCount;
          this.firstVisibleButton = this.lastVisibleButton - (this.maxVisibleButtons - 1);
      }
      if (this.currentPage <= 1) {
          this.currentPage += this.interval;
      }
      if (this.currentPage >= this.pagesCount) {
          this.currentPage -= this.interval;
      }
  }

  @action
  setBaseValues(maxVisibleButtons, totalItemsCount, pageSize) {
      this.maxVisibleButtons = maxVisibleButtons;
      this.interval = (maxVisibleButtons - 1) / 2;
      const pagesCount = setButtonsCount(totalItemsCount, pageSize);


      if (this.pagesCount !== pagesCount) {
          this.pagesCount = pagesCount;
          this.setStartEndbuttons(this.currentPage);
      }
  }
  @action
  changeCurrentPage(current) {
      this.currentPage = +current;
  }
}

export default new PaginationStore();
