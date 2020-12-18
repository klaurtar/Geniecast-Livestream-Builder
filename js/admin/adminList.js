import Alert from '../utils/alert.js';

const PAGE_URL = 'https://geniecast-livestream-builder.herokuapp.com';
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
        url: PAGE_URL_LOCAL + '/admin/' + button.id.toString(),
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
