import { DialogManager } from './dialogManager.js';

(function () {
  const $deleteButtons = document.querySelectorAll('.delete-button');
  console.log($deleteButtons);

  async function deleteButtonHandler(e) {
    const button = e.target;
    const deleteButtonSlug = button.closest('button').dataset.templateId;

    try {
      let foundData = await fetch(
        'http://localhost:8080/v1/api/videos/' + deleteButtonSlug
      );

      let data = await foundData.json();

      console.log(data.body);

      const dialog = DialogManager.createDialog({ doneButtonText: 'Delete' });
      dialog.open();
      dialog.setHead(
        `<h2>Delete <span style="color: red">${data.body.title}</span>?</h2>`
      );
      dialog.setContent(
        `<p>To delete this page please type the page's url 
          (<span style="background-color: lightgrey; color: red">${data.body.slug}</span>) in the input below.
          </p>
          <input type="text" id="delete-input" name="delete-input">`
      );

      dialog.onSave(() => {
        const $input = document.querySelector('#delete-input');

        if ($input.value !== data.body.slug) {
          return false;
        } else {
          deleteVideo(deleteButtonSlug);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteVideo(URL_PARAMS) {
    try {
      await fetch('http://localhost:8080/videos/' + URL_PARAMS, {
        method: 'DELETE',
      });
      console.log('Template was succesfully deleted');
      window.location.href = 'http://localhost:8080/videos/admin';
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  function setUpListeners() {
    $deleteButtons.forEach((button) => {
      button.addEventListener('click', deleteButtonHandler);
    });
  }

  function init() {
    setUpListeners();
  }
  init();
})();
