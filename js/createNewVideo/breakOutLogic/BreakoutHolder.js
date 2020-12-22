import BreakoutDay from './BreakoutDay.js';

class BreakoutHolder {
  constructor() {
    this.masterBreakoutHolder = [];

    this.$breakoutHolder = document.createElement('div');
    this.$breakoutHolder.className = 'breakout-holder';

    this.$breakoutHolder.innerHTML = `<div class="heading">
    
    
    <div class="tab" id="newBreakoutDay">
        +
    </div>
</div>
<div class="body px-3">
</div><div style="display: none" class="btn btn-dark my-3 ml-3 getAllData">Grab All Data</div>`;

    const initialBreakoutDay = new BreakoutDay();
    this.masterBreakoutHolder.push(initialBreakoutDay);

    this.$heading = this.$breakoutHolder.querySelector('.heading');
    this.$breakoutsGoHere = this.$breakoutHolder.querySelector('.body');
    this.$addNewButton = this.$breakoutHolder.querySelector('#newBreakoutDay');
    this.$getAllData = this.$breakoutHolder.querySelector('.getAllData');

    this.renderTab(initialBreakoutDay.id);
    // initialBreakoutDay.setHeading(
    //   `Day ${this.masterBreakoutHolder.indexOf(initialBreakoutDay) + 1}`
    // );

    this.renderBreakoutDays(initialBreakoutDay.id);

    this.setUpListeners();
  }

  getbreakoutHolder() {
    return this.$breakoutHolder;
  }

  createNewDay() {
    const newbreakoutDay = new BreakoutDay({ delete: true });
    console.log(newbreakoutDay.getbreakoutDayId());
    this.masterBreakoutHolder.push(newbreakoutDay);

    const foundIndex = this.masterBreakoutHolder.findIndex(
      (el) => el.id === newbreakoutDay.getbreakoutDayId()
    );
    console.log(foundIndex);

    // newbreakoutDay.setHeading(
    //   `Day ${this.masterbreakoutHolder.indexOf(newbreakoutDay) + 1}`
    // );
    this.removeActiveTabs();

    this.$addNewButton.insertAdjacentHTML(
      'beforebegin',
      `<div class="tab active" data-id="${newbreakoutDay.getbreakoutDayId()}">
    Day ${foundIndex + 1}
</div>`
    );

    this.renderBreakoutDays(this.masterBreakoutHolder[foundIndex].id);
  }

  findMatchingId(id) {
    let foundbreakout;
    this.masterbreakoutHolder.forEach((breakout) => {
      if (id == breakout.getbreakoutDayId()) foundbreakout = breakout;
    });
    return foundbreakout;
  }

  getAllData() {
    console.log(this.masterbreakoutHolder);

    let dataPayload = [];

    this.masterBreakoutHolder.forEach((day) => {
      const pulledbreakoutDay = day.getDayData();
      dataPayload.push(pulledbreakoutDay);
    });

    dataPayload = dataPayload.sort((a, b) => {
      console.log(typeof a.date);
      return a.date - b.date;
    });

    console.log(dataPayload);

    return dataPayload;
  }

  removeActiveTabs() {
    let $tabs = this.$heading.querySelectorAll('.tab');
    $tabs.forEach((tab) => {
      tab.classList.remove('active');
    });
  }

  renderBreakoutDays(id) {
    const foundBreakoutDay = this.masterBreakoutHolder.find(
      (el) => el.id === id
    );
    this.$breakoutsGoHere.innerHTML = '';
    this.$breakoutsGoHere.insertAdjacentElement(
      'afterbegin',
      foundBreakoutDay.getbreakoutDay()
    );
  }
  renderTab(id) {
    const foundIndex = this.masterBreakoutHolder.findIndex(
      (el) => el.id === id
    );
    this.$addNewButton.insertAdjacentHTML(
      'beforebegin',
      `<div class="tab active" data-id="${id}">
      Day ${foundIndex + 1}
  </div>`
    );
  }

  setUpListeners() {
    this.$addNewButton.addEventListener('click', () => {
      this.createNewDay();
    });

    this.$breakoutHolder.addEventListener('click', (e) => {
      const clickedElement = e.target;
      // console.dir(clickedElement);

      if (clickedElement.classList.contains('deleteDayButton')) {
        const identity = clickedElement.closest('.breakoutDay').dataset.id;
        let breakoutToDelete = this.findMatchingId(identity);
        this.masterbreakoutHolder.splice(
          this.masterbreakoutHolder.indexOf(breakoutToDelete),
          1
        );
        breakoutToDelete.removebreakoutDay();
        console.log(this.masterbreakoutHolder);
      }

      if (clickedElement.classList.contains('getAllData')) {
        this.getAllData();
      }

      if (
        clickedElement.classList.contains('tab') &&
        clickedElement.dataset.id
      ) {
        this.removeActiveTabs();
        clickedElement.classList.add('active');
        this.renderBreakoutDays(clickedElement.dataset.id);
      }
    });
  }
}

export default new BreakoutHolder();
