import EventDay from './EventDay.js';

class EventHolder {
  constructor() {
    this.masterEventHolder = [];

    this.$eventHolder = document.createElement('div');
    this.$eventHolder.className = 'eventMasterHolder';

    this.$eventHolder.innerHTML = `<div class="eventsGoHere"></div><div class="container text-right"><div class="btn btn-info my-3 addNewButton">Add Day</div><div class="btn btn-dark my-3 ml-3 getAllData">Grab All Data</div></div>`;

    this.initialEventDay = new EventDay();
    this.masterEventHolder.push(this.initialEventDay);

    this.initialEventDay.setHeading(
      `Day ${this.masterEventHolder.indexOf(this.initialEventDay) + 1}`
    );

    this.$eventsGoHere = this.$eventHolder.querySelector('.eventsGoHere');
    this.$addNewButton = this.$eventHolder.querySelector('.addNewButton');
    this.$getAllData = this.$eventHolder.querySelector('.getAllData');

    this.$eventsGoHere.append(this.initialEventDay.getEventDay());

    this.setUpListeners();
  }

  getEventHolder() {
    return this.$eventHolder;
  }

  createNewDay() {
    const newEventDay = new EventDay({ delete: true });
    this.masterEventHolder.push(newEventDay);

    newEventDay.setHeading(
      `Day ${this.masterEventHolder.indexOf(newEventDay) + 1}`
    );

    this.$eventsGoHere.append(newEventDay.getEventDay());
  }

  findMatchingId(id) {
    let foundEvent;
    this.masterEventHolder.forEach((event) => {
      if (id == event.getEventDayId()) foundEvent = event;
    });
    return foundEvent;
  }

  getAllData() {
    console.log(this.masterEventHolder);

    let dataPayload = [];

    this.masterEventHolder.forEach((day) => {
      const pulledEventDay = day.getDayData();
      dataPayload.push(pulledEventDay);
    });

    dataPayload = dataPayload.sort((a, b) => {
      console.log(typeof a.date);
      return a.date - b.date;
    });

    console.log(dataPayload);

    return dataPayload;
  }

  onEdit(info) {
    console.log(info);
    info.forEach((date, i) => {
      if (i === 0) {
        this.initialEventDay.editInputDay(date.date);
        this.initialEventDay.createEditInfoForDate(date.eventInformation);
      } else {
        const editDay = new EventDay({ delete: true });
        editDay.editInputDay(date.date);
        //date.eventInformation => array
        editDay.createEditInfoForDate(date.eventInformation);
        this.masterEventHolder.push(editDay);
        console.log(this.masterEventHolder);

        editDay.setHeading(
          `Day ${this.masterEventHolder.indexOf(editDay) + 1}`
        );

        this.$eventsGoHere.append(editDay.getEventDay());
      }
    });
  }

  setUpListeners() {
    this.$addNewButton.addEventListener('click', () => {
      this.createNewDay();
    });

    this.$eventHolder.addEventListener('click', (e) => {
      const clickedElement = e.target;

      if (clickedElement.classList.contains('deleteDayButton')) {
        const identity = clickedElement.closest('.eventDay').dataset.id;
        let eventToDelete = this.findMatchingId(identity);
        this.masterEventHolder.splice(
          this.masterEventHolder.indexOf(eventToDelete),
          1
        );
        eventToDelete.removeEventDay();
        console.log(this.masterEventHolder);
      }

      if (clickedElement.classList.contains('getAllData')) {
        this.getAllData();
      }
    });
  }
}

export default EventHolder;
