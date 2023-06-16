import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const button = document.querySelector('.my-button');
const closeBtn = document.querySelector('.close-button');
const trailerBtn = document.querySelector('.btn-trailer');
const backdropTrailer = document.querySelector('.js-backdrop-trailer');

button.addEventListener('click', showTrailer);
trailerBtn.addEventListener('click', showTrailer);
closeBtn.addEventListener('click', removeTrailer);

function removeTrailer() {
  backdropTrailer.classList.add('is-hidden');
}

function showTrailer() {
  backdropTrailer.classList.remove('is-hidden');
}
