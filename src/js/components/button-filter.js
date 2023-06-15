const buttonFilter = document.querySelector('#buttonFilter');

const svgFilter = document.querySelector('#buttonFilter svg');

export let ifAdult = false;

buttonFilter.addEventListener('click', () => {
  if (ifAdult === false) {
    ifAdult = true;
    svgFilter.classList.add('filter-color-adult');
  } else {
    ifAdult = false;
    svgFilter.classList.remove('filter-color-adult');
  }
});
