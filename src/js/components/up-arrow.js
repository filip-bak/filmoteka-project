import throttle from 'lodash.throttle';

const scrollButton = document.querySelector('.arrow__up');
const headerEl = document.querySelector('.header');

hide();

scrollButton.addEventListener('click', scrollUp);

function show() {
  scrollButton.style.display = 'block';
}

function hide() {
  scrollButton.style.display = 'none';
}

function handleScroll() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  scrollY > headerEl.offsetTop ? show() : hide();
}

window.addEventListener('scroll', throttle(handleScroll, 500));

function scrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
