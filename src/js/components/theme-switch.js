
const bodyMode = document.querySelector('body');
const toggleMode = document.querySelector('#switch-toggle');
const footerMode = document.querySelector('.footer');
const pagiMode = document.querySelector('#pagination');

toggleMode.addEventListener('change', event => {
  if (bodyMode.classList.contains('dark-theme')) {
    bodyMode.classList.remove('dark-theme');
    bodyMode.classList.add('light-theme');
    footerMode.classList.remove('dark-theme');
    pagiMode.classList.remove('dark-theme');
  } else {
    bodyMode.classList.remove('light-theme');
    bodyMode.classList.add('dark-theme');
    footerMode.classList.add('dark-theme');
    pagiMode.classList.add('dark-theme');
  }
});

export { bodyMode, toggleMode, footerMode, pagiMode };
