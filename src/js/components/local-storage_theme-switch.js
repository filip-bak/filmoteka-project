import { bodyMode, toggleMode, footerMode } from '../components/theme-switch';

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
