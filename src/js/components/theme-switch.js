const bodyMode = document.querySelector('body');
const toggleMode = document.querySelector('#switch-toggle');
const footerMode = document.querySelector('.footer');
const pagiMode = document.querySelector('#pagination');
const genreContainer = document.querySelector('.container-genres');

toggleMode.addEventListener('change', event => {
  if (bodyMode.classList.contains('dark-theme')) {
    // LIGHT THEME
    bodyMode.classList.add('light-theme');
    bodyMode.classList.remove('dark-theme');

    if (genreContainer === null) return;
    genreContainer.classList.remove('dark-theme');

    if (footerMode === null) return;
    footerMode.classList.remove('dark-theme');

    if (pagiMode === null) return;
    pagiMode.classList.remove('dark-theme');
  } else {
    // DARK THEME
    bodyMode.classList.add('dark-theme');
    bodyMode.classList.remove('light-theme');

    if (footerMode === null) return;
    footerMode.classList.add('dark-theme');

    if (genreContainer === null) return;
    genreContainer.classList.add('dark-theme');

    if (pagiMode === null) return;
    pagiMode.classList.add('dark-theme');
  }
});

export { bodyMode, toggleMode, footerMode, pagiMode, genreContainer };
