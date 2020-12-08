class SpeakerContainer {
  constructor(speakerInfo) {
    this.$speakerContainer = document.createElement('div');
    this.$speakerContainer.className = 'speaker__container';

    this.$speakerContainer.innerHTML = `<div class="speaker__container-name">
                                            ${speakerInfo.speakerName}
                                        </div>
                                        <div class="speaker__container-exit">
                                            X
                                        </div>`;

    this.$speakerName = this.$speakerContainer.querySelector(
      '.speaker__container-name'
    );
    this.$speakerExit = this.$speakerContainer.querySelector(
      '.speaker__container-exit'
    );

    this._id = speakerInfo.id;
    console.log('ID IS:', this._id);

    this.preventClose = false;

    this.onClickHandler = [];
    this.closeHandler = [];

    this.setUpListeners();
  }

  getSpeakerContainer() {
    return this.$speakerContainer;
  }

  nameClick() {
    return this._id;
  }

  onClick(fn) {
    this.onClickHandler.push(fn);
  }

  onClose(fn) {
    this.closeHandler.push(fn);
  }

  close() {
    this.$speakerContainer.remove();
  }

  togglePreventClose(boolean) {
    this.preventClose = boolean;
    if (this.preventClose) {
      this.$speakerExit.style.color = 'silver';
      this.$speakerContainer.style.cursor = 'not-allowed';
    } else {
      this.$speakerExit.style.color = 'black';
      this.$speakerContainer.style.cursor = 'pointer';
    }
  }

  setUpListeners() {
    this.$speakerName.addEventListener('click', () => {
      if (!this.preventClose) {
        this.onClickHandler.forEach((fn) => fn());
        console.log(this.nameClick());
      }
    });

    this.$speakerExit.addEventListener('click', () => {
      if (!this.preventClose) {
        this.closeHandler.forEach((fn) => fn());
        this.close();
      }
    });
  }
}

export default SpeakerContainer;
