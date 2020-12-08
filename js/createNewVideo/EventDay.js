import EventInfo from './EventInfo.js';
import guidGenerator from './guid.js';

export default class EventDay {
  constructor(
    options = {
      delete: false,
    }
  ) {
    this.options = options;
    this.eventHolder = [];

    this.id = guidGenerator();

    this.$eventDay = document.createElement('div');
    this.$eventDay.className = 'eventDay p-3 mx-3 border border-danger rounded';

    this.$eventDay.dataset.id = this.id;

    this.setInnerHTML();

    this.heading = this.$eventDay.querySelector('.heading');
    this.$eventInfoContainer = this.$eventDay.querySelector(
      '.eventInfoContainer'
    );
    this.$newEventButton = this.$eventDay.querySelector('.addNewEventButton');

    const initialEventInfo = new EventInfo();

    this.eventHolder.push(initialEventInfo);

    this.$eventInfoContainer.append(initialEventInfo.getEventInfo());

    this.setUpListeners();
  }

  setInnerHTML() {
    this.$eventDay.innerHTML = `<h2 class="heading"></h2>
        
        ${
          this.options.delete
            ? '<div class="text-right"><button class="btn btn-danger deleteDayButton">Delete Day</button></div>'
            : ''
        }
        <div class="form-group">
        <label for="dayOfEvent">Day of Event</label>
        <input type="date" name="dayOfEvent" class="form-control dayOfEvent">
    </div>

    <div class="eventInfoContainer">
    
    </div>
    
    <div>
        <div class="container text-center">
            <div class="btn btn-secondary my-3 addNewEventButton">+</div>
        </div>
        
    </div>`;

    // <div class="btn btn-warning pullDayData">Pull day data</div>
  }

  getEventDay() {
    return this.$eventDay;
  }

  getEventDayId() {
    return this.id;
  }

  createNewEventInfo() {
    const newEventInfo = new EventInfo({ delete: true });
    this.eventHolder.push(newEventInfo);
    this.$eventInfoContainer.append(newEventInfo.getEventInfo());
  }

  findMatchingId(id) {
    let foundEvent;
    this.eventHolder.forEach((event) => {
      if (id == event.getEventId()) foundEvent = event;
    });
    return foundEvent;
  }

  getDayData() {
    console.log(this.eventHolder);
    const $datePicker = this.$eventDay.querySelector('.dayOfEvent');

    function timeToDecimal(t) {
      var arr = t.split(':');
      var dec = parseInt((arr[1] / 6) * 10, 10);

      return parseFloat(
        parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec
      );
    }

    const dataPayload = {
      date: $datePicker.value,
      eventInformation: [],
    };

    this.eventHolder.forEach((event) => {
      const pulledEventInfo = event.pullData();
      dataPayload.eventInformation.push(pulledEventInfo);
    });

    dataPayload.eventInformation = dataPayload.eventInformation.sort((a, b) => {
      console.log(typeof a.startTime);
      return timeToDecimal(a.startTime) - timeToDecimal(b.startTime);
    });

    console.log(dataPayload);

    return dataPayload;
  }

  removeEventDay() {
    this.$eventDay.remove();
  }

  setHeading(str) {
    this.heading.innerText = str;
  }

  setUpListeners() {
    this.$eventDay.addEventListener('click', (e) => {
      const clickedElement = e.target;
      // console.dir(clickedElement);

      if (clickedElement.classList.contains('deleteButton')) {
        const identity = clickedElement.closest('.singleEvent').dataset.id;
        let eventToDelete = this.findMatchingId(identity);
        this.eventHolder.splice(this.eventHolder.indexOf(eventToDelete), 1);
        eventToDelete.removeEventInfo();
        console.log(this.eventHolder);
      }

      if (clickedElement.classList.contains('addNewEventButton')) {
        this.createNewEventInfo();
        console.log(this.eventHolder);
      }

      // if(clickedElement.classList.contains('pullDayData')) {
      //     this.getDayData();
      // }
    });
  }
}
