import guidGenerator from './guid.js';

export default class EventInfo {
  constructor(
    options = {
      delete: false,
    }
  ) {
    this.options = options;
    this.id = guidGenerator();
    this.$eventInfo = document.createElement('div');
    this.$eventInfo.className =
      'p-3 mx-3 border border-primary rounded singleEvent';

    this.$eventInfo.dataset.id = this.id;

    this.$eventInfo.innerHTML = `${
      this.options.delete
        ? '<div class="text-right"><button class="btn btn-danger deleteButton">X</button></div>'
        : ''
    }
        <div class="form-group">
        <label for="startTime">Start Time of Event</label>
        <input type="time" name="startTime" class="form-control startTime">
    </div>

    <div class="form-group">
        <label for="endTime">End Time of Event</label>
        <input type="time" name="endTime" class="form-control endTime">
    </div>

    <div class="form-group">
        <label for="eventTitle">Event Title</label>
        <input type="text" name="eventTitle" class="form-control eventTitle">
    </div>

    <div class="form-group">
        <label for="eventSubtitle">Event Subtitle (optional)</label>
        <input type="text" name="eventSubtitle" class="form-control eventSubtitle">
    </div>

    <div class="form-group">
        <label for="moderators">Moderators (optional)</label>
        <input type="text" name="moderators" class="form-control moderators">
    </div>

    <div class="form-group">
        <label for="speakers">Speakers (optional)</label>
        <input type="text" name="speakers" class="form-control speakers">
    </div>`;

    // <button class="btn btn-success dataPull">Grab Data</button>`;

    this.$startTime = this.$eventInfo.querySelector('.startTime');
    this.$endTime = this.$eventInfo.querySelector('.endTime');
    this.$eventTitle = this.$eventInfo.querySelector('.eventTitle');
    this.$eventSubtitle = this.$eventInfo.querySelector('.eventSubtitle');
    this.$moderators = this.$eventInfo.querySelector('.moderators');
    this.$speakers = this.$eventInfo.querySelector('.speakers');

    // this.dataButton = this.$eventInfo.querySelector('.dataPull');

    // this.setUpListeners();
  }

  getEventInfo() {
    return this.$eventInfo;
  }

  getEventId() {
    return this.id;
  }

  removeEventInfo() {
    this.$eventInfo.remove();
  }

  setEditInfo(obj) {
    this.$startTime.value = obj.startTime;
    this.$endTime.value = obj.endTime;
    this.$eventTitle.value = obj.eventTitle;
    this.$eventSubtitle.value = obj.eventSubtitle;
    this.$moderators.value = obj.moderators;
    this.$speakers.value = obj.speakers;
  }

  pullData() {
    const grabbedData = {
      startTime: this.$startTime.value,
      endTime: this.$endTime.value,
      eventTitle: this.$eventTitle.value,
      eventSubtitle: this.$eventSubtitle.value,
      moderators: this.$moderators.value,
      speakers: this.$speakers.value,
    };

    console.log(grabbedData);
    return grabbedData;
  }
}
