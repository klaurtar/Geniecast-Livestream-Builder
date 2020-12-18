export default class Alert {
  constructor(status, message, time) {
    this.time = time;
    this.$alert = document.createElement('div');

    if (status === 'success') {
      this.$alert.className = 'alert alert-success';
    } else if (status === 'error') {
      this.$alert.className = 'alert alert-danger';
    }

    this.$alert.innerText = message;
  }
  showAlertAndTimeout(selector) {
    selector.insertAdjacentElement('afterbegin', this.$alert);

    setTimeout(() => {
      this.$alert.remove();
    }, this.time);
  }
  getElement() {
    return this.$alert;
  }
}
