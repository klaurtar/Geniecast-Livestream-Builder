const $sidebar = document.querySelector('.sidebar');
const $navbar = document.querySelector('.navbar');
const $logoContainer = document.querySelector('.logo-container');
const $video = document.querySelector('.video');
const $multiBackground = document.querySelector('.multi-background');
const $footer = document.querySelector('.footer');

export function closeSidebar() {
  $navbar.style.gridColumn = '1 / -1';
  $logoContainer.style.gridColumn = '9 / 13';

  $video.style.gridColumn = '1 / -1';
  $video.style.gridRow = '4 / -1';
  $multiBackground.style.padding = '2%';
  $footer.style.display = 'none';

  $navbar.innerHTML = `<div class="open-container">
    <i class="fas fa-angle-double-left" style="color: white"></i>
  </div>`;
}

export function openEverything() {
  $navbar.style.gridColumn = '1 / 13';
  $logoContainer.style.gridColumn = '5 / 9';

  $video.style.gridColumn = '1 / 13';
  $video.style.gridRow = '4 / 24';
  $multiBackground.style.padding = '5%';
  $footer.style.display = 'grid';

  $navbar.innerHTML = ``;
}
