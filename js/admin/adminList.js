const $addNewUser = document.querySelector('.add-new-user');
const $newUserContainer = document.querySelector('.new-user-container');

$addNewUser.addEventListener('click', () => {
  $newUserContainer.style.display = 'block';
});
