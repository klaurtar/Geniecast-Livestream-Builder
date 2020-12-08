const dialogTemplate = `
    <div class="dialog">
        <div class="overlay"></div>
        <div class="p-2 dialog-box">
            <div class="close-icon"><span class="x-icon">X</span></div>
            <div class="head"></div>
            <div class="body"></div>
            <hr>
            <div class="button-container">
                <button class="done-button"></button>
                <button class="cancel-button">Cancel</button>
            </div>
        </div>
    </div> 
`;

export const DialogManager = (function () {
  const $dialogContainerElement = document.createElement('div');
  $dialogContainerElement.className = 'topLevelDialogContainer';
  document.body.appendChild($dialogContainerElement);

  return {
    createDialog: (options) => {
      const dialog = new Dialog(options);
      const $dialogElement = dialog.getDialogElement();
      $dialogContainerElement.appendChild($dialogElement);
      return dialog;
    },
  };
})();

class Dialog {
  constructor(
    options = {
      color: 'black',
      doneButtonText: 'Save',
      padding: '20px',
      doneButtonDisplay: 'block',
    }
  ) {
    this.options = options;

    this.$dialogElement = document.createElement('div');
    this.$dialogElement.className = 'dialog-container';
    this.$dialogElement.innerHTML = dialogTemplate;

    this.$dialogBox = this.$dialogElement.children[0].children[1];
    this.$dialogOverlay = this.$dialogElement.children[0].children[0];

    this.$head = this.$dialogBox.querySelector('.head');
    this.$body = this.$dialogElement.querySelector('.body');

    this.$body.style.color = this.options.color;
    this.$body.style.padding = this.options.padding;

    this.$doneButton = this.$dialogBox.querySelector('.done-button');
    this.$cancelButton = this.$dialogBox.querySelector('.cancel-button');
    this.$exitButton = this.$dialogBox.querySelector('.x-icon');

    this.$doneButton.style.display = this.options.doneButtonDisplay;
    this.$doneButton.innerText = this.options.doneButtonText;

    this.onSaveHandler = [];
    this.onCloseHandler = [];

    this.setUpListeners();
  }

  open() {
    this.$dialogBox.style.display = 'block';
    this.$dialogOverlay.style.display = 'block';
  }

  close() {
    this.$dialogElement.remove();
  }

  setHead($content) {
    if (typeof $content === 'string') {
      this.$head.innerHTML = $content;
    } else {
      this.$head.appendChild($content);
    }
  }

  setContent($content) {
    if (typeof $content === 'string') {
      this.$body.innerHTML = $content;
    } else {
      this.$body.appendChild($content);
    }
  }

  onSave(callbackHandler) {
    this.onSaveHandler.push(callbackHandler);
  }

  onClose(callBackHandler) {
    this.onCloseHandler.push(callBackHandler);
  }

  getDialogElement() {
    return this.$dialogElement;
  }

  setUpListeners() {
    this.$doneButton.addEventListener('click', () => {
      let allowClose = true;
      this.onSaveHandler.forEach((handler) => {
        if (handler() === false) allowClose = false;
      });
      // this.onSaveHandler && this.onSaveHandler();
      if (allowClose) {
        this.close();
      }
    });
    this.$cancelButton.addEventListener('click', () => {
      this.onCloseHandler.forEach((handler) => {
        handler();
      });
      this.close();
      // this.onCloseHandler && this.onCloseHandler();
    });
    this.$exitButton.addEventListener('click', () => {
      this.close();
    });
  }
}
