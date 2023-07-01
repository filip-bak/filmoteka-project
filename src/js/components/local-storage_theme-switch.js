import {
  bodyMode,
  toggleMode,
  footerMode,
  pagiMode,
  genreContainer,
} from '../components/theme-switch';

export const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const savedTheme = localStorage.getItem('theme');

toggleMode.addEventListener('change', event => {
  localStorage.setItem('theme', bodyMode.classList);
});

updateTheme();
checkboxChecked();
updateThemeFooter();
updateThemePagination();
updateThemeGenresTabs();

function updateTheme() {
  if (savedTheme) {
    bodyMode.classList = savedTheme;
  }
}

function checkboxChecked() {
  if (savedTheme === 'dark-theme') {
    toggleMode.setAttribute('checked', true);
  }
}

function updateThemeFooter() {
  if (savedTheme === 'dark-theme') {
    footerMode.classList.add('dark-theme');
  }
}

function updateThemePagination() {
  if (savedTheme === 'dark-theme') {
    if (pagiMode === null) return;
    pagiMode.classList.add('dark-theme');
  }
}
function updateThemeGenresTabs() {
  if (savedTheme === 'dark-theme') {
    if (genreContainer === null) return;
    genreContainer.classList.add('dark-theme');
  }
}
