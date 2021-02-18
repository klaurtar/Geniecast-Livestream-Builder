import Alert from '../utils/alert.js';
import { DialogManager } from '../allVideos/dialogManager.js';

const PAGE_URL = 'https://geniecast-video-page-builder.herokuapp.com';
const PAGE_URL_LOCAL = 'http://localhost:8080';
// console.log(PAGE_URL_LOCAL + '/admin/' + button.id.toString());
const $addNewUser = document.querySelector('.add-new-user');
const $newUserContainer = document.querySelector('.new-user-container');
const $submitButton = document.querySelector('#submit');
const $cancelButton = document.querySelector('#cancel');

const $newName = document.querySelector('#newName');
const $newEmail = document.querySelector('#newEmail');
const $newPassword = document.querySelector('#newPassword');
const $newPasswordConfirm = document.querySelector('#newPasswordConfirm');
const $newPhoto = document.querySelector('#newPhoto');
const $newRole = document.querySelector('#newRole');

const $editButtonAll = document.querySelectorAll('.admin-edit');
const $adminButtonAll = document.querySelectorAll('.admin-delete');

$addNewUser.addEventListener('click', () => {
  $newUserContainer.style.display = 'block';
  $addNewUser.disabled = true;
});

$submitButton.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const res = await axios({
      method: 'POST',
      url: PAGE_URL + '/v1/api/users/' + userID.toString(),
      data: {
        name: $newName.value,
        email: $newEmail.value,
        password: $newPassword.value,
        passwordConfirm: $newPasswordConfirm.value,
        photo: $newPhoto.value,
        role: $newRole.value,
        addedBy: userID,
      },
    });

    if (res.data.status === 'success') {
      // alert('logged in successfully');
      $newUserContainer.style.display = 'none';
      const successAlert = new Alert(
        'success',
        'Admin successfully added',
        3000
      );
      successAlert.showAlertAndTimeout(document.querySelector('body'));
      window.setTimeout(() => {
        location.assign('/admin/admin-list');
      }, 500);
    }

    console.log(res);
  } catch (err) {
    alert(err.response.data.message);
  }
});

$cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  $newUserContainer.style.display = 'none';
  $addNewUser.disabled = false;
});

$adminButtonAll.forEach((button) => {
  button.addEventListener('click', async () => {
    console.log(PAGE_URL + '/admin/' + button.id.toString());
    try {
      const res = await axios({
        method: 'DELETE',
        url: PAGE_URL + '/admin/' + button.id.toString(),
      });
      console.log(res);
      if (res.status === 204) {
        new Alert(
          'success',
          'Admin successfully removed',
          3000
        ).showAlertAndTimeout(document.querySelector('body'));
        window.setTimeout(() => {
          location.assign('/admin/admin-list');
        }, 500);
      }
    } catch (err) {
      new Alert('error', err.response.data.message, 3000).showAlertAndTimeout(
        document.querySelector('body')
      );
    }
  });
});

$editButtonAll.forEach((button) => {
  const BUTTON_ID = button.dataset.identity;
  console.log(BUTTON_ID);
  button.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: PAGE_URL + '/admin/' + BUTTON_ID.toString(),
      });
      const { data } = await res;
      const foundAdmin = data.data.admin;

      const dialog = DialogManager.createDialog();
      dialog.setHead(`<h2>Edit ${foundAdmin.name}'s Profile</h2>`);
      dialog.setContent(`<form>
      <div class="form-group">
        <label for="editName">Name</label>
        <input value="${
          foundAdmin.name
        }" type="text" class="form-control" id="editName" placeholder="John Smith">
      </div>
      <div class="form-group">
        <label for="editEmail">Email address</label>
        <input value="${
          foundAdmin.email
        }" type="email" class="form-control" id="editEmail" placeholder="name@example.com">
      </div>
      <div class="form-group">
        <label for="editPassword">Password</label>
        <input value="${
          foundAdmin.password
        }" type="password" class="form-control" id="editPassword" placeholder="password">
      </div>
      <div class="form-group">
        <label for="editPasswordConfirm">Password Confirm</label>
        <input value="${
          foundAdmin.passwordConfirm
        }" type="password" class="form-control" id="editPasswordConfirm" placeholder="password confirm">
      </div>
      <div class="form-group">
        <label for="editPhoto">Photo (Optional)</label>
        <input value="${
          foundAdmin.photo
        }" type="text" class="form-control" id="editPhoto" placeholder="photo URL here">
      </div>
      <div class="form-group">
        <label for="editRole">Role</label>
        <select class="form-control" id="editRole">
          <option ${
            foundAdmin.role === 'Editor' ? 'selected' : ''
          } value="Editor">Editor</option>
          <option ${
            foundAdmin.role === 'admin' ? 'selected' : ''
          } value="admin">Admin</option>
          <option ${
            foundAdmin.role === 'Super Admin' ? 'selected' : ''
          } value="Super Admin">Super Admin</option>
        </select>
      </div>
    </form>`);

      dialog.onSave(async () => {
        const $editName = document.querySelector('#editName');
        const $editEmail = document.querySelector('#editEmail');
        const $editPassword = document.querySelector('#editPassword');
        const $editPasswordConfirm = document.querySelector(
          '#editPasswordConfirm'
        );
        const $editPhoto = document.querySelector('#editPhoto');
        const $editRole = document.querySelector('#editRole');

        try {
          const res = await axios({
            method: 'PATCH',
            url: PAGE_URL + '/admin/' + foundAdmin.id.toString(),
            data: {
              name: $editName.value,
              email: $editEmail.value,
              password: $editPassword.value,
              passwordConfirm: $editPasswordConfirm.value,
              photo: $editPhoto.value,
              role: $editRole.value,
            },
          });

          const { data } = await res;
          console.log(data);

          if (data.status === 'success') {
            new Alert(
              'success',
              'Admin was successfully updated',
              3000
            ).showAlertAndTimeout(document.querySelector('body'));
            window.setTimeout(() => {
              location.assign('/admin/admin-list');
            }, 500);
          }
        } catch (err) {
          new Alert(
            'success',
            err.response.data.message,
            3000
          ).showAlertAndTimeout(document.querySelector('body'));
        }
      });

      dialog.open();
    } catch (err) {
      console.log(err);
    }

    // const dialog = DialogManager.createDialog();
    // console.log(dialog);
    // dialog.open();

    // dialog.setHead('Edit ');
  });
});
