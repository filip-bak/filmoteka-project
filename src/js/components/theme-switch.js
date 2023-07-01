const bodyMode = document.querySelector('body');
const toggleMode = document.querySelector('#switch-toggle');
const footerMode = document.querySelector('.footer');
const pagiMode = document.querySelector('#pagination');
const genreContainer = document.querySelector('.container-genres');

toggleMode.addEventListener('change', event => {
  if (bodyMode.classList.contains('dark-theme')) {
    bodyMode.classList.remove('dark-theme');
    bodyMode.classList.add('light-theme');
    genreContainer.classList.remove('dark-theme');
    footerMode.classList.remove('dark-theme');
    if (pagiMode === null) return;
    pagiMode.classList.remove('dark-theme');
  } else {
    bodyMode.classList.remove('light-theme');
    bodyMode.classList.add('dark-theme');
    footerMode.classList.add('dark-theme');
    genreContainer.classList.add('dark-theme');

    if (pagiMode === null) return;
    pagiMode.classList.add('dark-theme');
  }
});

export { bodyMode, toggleMode, footerMode, pagiMode, genreContainer };
