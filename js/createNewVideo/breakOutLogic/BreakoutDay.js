import BreakoutInfo from './BreakoutInfo.js';
import guidGenerator from '../guid.js';

export default class BreakoutDay {
  constructor(
    options = {
      delete: false,
    }
  ) {
    this.options = options;
    this.breakoutHolder = [];

    this.id = guidGenerator();

    this.$breakoutDay = document.createElement('div');
    this.$breakoutDay.className = 'breakoutDay p-2';

    this.$breakoutDay.dataset.id = this.id;

    this.setInnerHTML();

    this.heading = this.$breakoutDay.querySelector('.heading');
    this.$breakoutInfoContainer = this.$breakoutDay.querySelector(
      '.breakoutInfoContainer'
    );
    this.$newbreakoutButton = this.$breakoutDay.querySelector(
      '.addNewbreakoutButton'
    );

    this.initialBreakoutInfo = new BreakoutInfo();
    this.$dateInput = this.$breakoutDay.querySelector('dayOfBreakout');
    this.breakoutHolder.push(this.initialBreakoutInfo);

    this.$breakoutInfoContainer.append(
      this.initialBreakoutInfo.getbreakoutInfo()
    );

    this.setUpListeners();
  }

  setInnerHTML() {
    this.$breakoutDay.innerHTML = `
    <div class="breakoutInfoContainer">
    <div class="form-group">
    <label for="dayOfBreakout">Day of Breakout</label>
    <input type="date" name="dayOfBreakout" class="form-control dayOfBreakout">
</div>
    </div>

    <div>
        <div class="container text-center">
            <div class="btn btn-secondary my-3 addNewbreakoutButton">+</div>
        </div>
        
    </div>`;
  }

  getbreakoutDay() {
    return this.$breakoutDay;
  }

  getbreakoutDayId() {
    return this.id;
  }

  createNewbreakoutInfo() {
    const newbreakoutInfo = new BreakoutInfo({ delete: true });
    this.breakoutHolder.push(newbreakoutInfo);
    this.$breakoutInfoContainer.append(newbreakoutInfo.getbreakoutInfo());
  }

  findMatchingId(id) {
    let foundbreakout;
    this.breakoutHolder.forEach((breakout) => {
      if (id == breakout.getbreakoutId()) foundbreakout = breakout;
    });
    return foundbreakout;
  }

  getDayData() {
    console.log(this.breakoutHolder);
    const $datePicker = this.$breakoutDay.querySelector('.dayOfBreakout');

    function timeToDecimal(t) {
      var arr = t.split(':');
      var dec = parseInt((arr[1] / 6) * 10, 10);

      return parseFloat(
        parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec
      );
    }

    const dataPayload = {
      date: $datePicker.value,
      breakoutInformation: [],
    };

    this.breakoutHolder.forEach((breakout) => {
      const pulledbreakoutInfo = breakout.pullData();
      dataPayload.breakoutInformation.push(pulledbreakoutInfo);
    });

    dataPayload.breakoutInformation = dataPayload.breakoutInformation.sort(
      (a, b) => {
        console.log(typeof a.startTime);
        return timeToDecimal(a.startTime) - timeToDecimal(b.startTime);
      }
    );

    console.log(dataPayload);

    return dataPayload;
  }

  removebreakoutDay() {
    this.$breakoutDay.remove();
  }

  editBreakoutDay(date) {
    this.$dateInput.value = date;
  }

  setHeading(str) {
    this.heading.innerText = str;
  }

  createEditInfoForBreakout(arrOfInfo) {
    arrOfInfo.forEach((singleEvent, i) => {
      if (i === 0) {
        this.initialBreakoutInfo.setEditInfo(singleEvent);
      } else {
        const editBreakoutInfo = new BreakoutInfo({ delete: true });
        editBreakoutInfo.setEditInfo(singleEvent);
        this.breakoutHolder.push(editBreakoutInfo);
        this.$breakoutInfoContainer.append(editBreakoutInfo.getbreakoutInfo());
      }
    });
  }

  setUpListeners() {
    this.$breakoutDay.addEventListener('click', (e) => {
      const clickedElement = e.target;
      // console.dir(clickedElement);

      if (clickedElement.classList.contains('deleteButton')) {
        const identity = clickedElement.closest('.singlebreakout').dataset.id;
        let breakoutToDelete = this.findMatchingId(identity);
        this.breakoutHolder.splice(
          this.breakoutHolder.indexOf(breakoutToDelete),
          1
        );
        breakoutToDelete.removebreakoutInfo();
        console.log(this.breakoutHolder);
      }

      if (clickedElement.classList.contains('addNewbreakoutButton')) {
        this.createNewbreakoutInfo();
        console.log(this.breakoutHolder);
      }

      if (clickedElement.classList.contains('pullDayData')) {
        this.getDayData();
      }
    });
  }
}
