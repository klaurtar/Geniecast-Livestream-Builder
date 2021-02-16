import guidGenerator from '../guid.js';

export default class BreakoutInfo {
  constructor(
    options = {
      delete: false,
    }
  ) {
    this.options = options;
    this.id = guidGenerator();
    this.$breakoutInfo = document.createElement('div');
    this.$breakoutInfo.className = 'breakout-info px-3';

    this.$breakoutInfo.dataset.id = this.id;

    this.$breakoutInfo.innerHTML = `
    <div class="form-group">
        <label for="eventTitle">Breakout Room Title</label>
        <input type="text" name="breakoutTitle" class="form-control breakoutTitle">
    </div>

    <div class="form-group">
        <label for="startTime">Start Time of Breakout Room</label>
        <input type="time" name="startTime" class="form-control startTime">
    </div>

    <div class="form-group">
        <label for="endTime">End Time of Breakout Room</label>
        <input type="time" name="endTime" class="form-control endTime">
    </div>

    <div class="form-group">
        <label for="breakoutLink">Breakout Room Link</label>
        <input type="text" name="breakoutLink" class="form-control breakoutLink">
    </div>
    <hr class="breakout-hr" />`;

    this.$startTime = this.$breakoutInfo.querySelector('.startTime');
    this.$endTime = this.$breakoutInfo.querySelector('.endTime');
    this.$breakoutTitle = this.$breakoutInfo.querySelector('.breakoutTitle');
    this.$breakoutLink = this.$breakoutInfo.querySelector('.breakoutLink');

    //this.dataButton = this.$breakoutInfo.querySelector('.dataPull');

    this.setUpListeners();
  }

  getbreakoutInfo() {
    return this.$breakoutInfo;
  }

  getbreakoutId() {
    return this.id;
  }

  removebreakoutInfo() {
    this.$breakoutInfo.remove();
  }

  pullData() {
    const grabbedData = {
      startTime: this.$startTime.value,
      endTime: this.$endTime.value,
      breakoutTitle: this.$breakoutTitle.value,
      breakoutLink: this.$breakoutLink.value,
    };

    console.log(grabbedData);
    return grabbedData;
  }

  setEditInfo(obj) {
    this.$startTime.value = obj.startTime;
    this.$endTime.value = obj.endTime;
    this.$breakoutTitle.value = obj.breakoutTitle;
    this.$breakoutLink.value = obj.breakoutLink;
  }

  setUpListeners() {
    // this.dataButton.addEventListener('click', () => {
    //   this.pullData();
    // });
  }
}
