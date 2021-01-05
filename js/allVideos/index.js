import { DialogManager } from './dialogManager.js';

(function () {
  const PAGE_URL = 'https://geniecast-livestream-builder.herokuapp.com';
  const $deleteButtons = document.querySelectorAll('.delete-button');
  console.log($deleteButtons);

  async function deleteButtonHandler(e) {
    const button = e.target;
    const deleteButtonSlug = button.closest('button').dataset.templateId;

    console.log(deleteButtonSlug);

    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      let foundData = await fetch(
        PAGE_URL + '/v1/api/videos/' + deleteButtonSlug,
        requestOptions
      );

      let data = await foundData.json();

      console.log(data);

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
      await fetch(PAGE_URL + '/videos/' + URL_PARAMS, {
        method: 'DELETE',
      });
      console.log('Template was succesfully deleted');
      window.location.assign('/admin');
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
