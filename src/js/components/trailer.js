import Api from './API';
import { withoutTrailer, showLoader, hideLoader } from './notifications';

const backdropTrailer = document.querySelector('.js-backdrop-trailer');

const closeBtn = document.querySelector('.close-button');

export async function TrailersHandle() {
  setTimeout(() => {
    const trailers = document.querySelectorAll('.btn-trailer');
    trailers.forEach(trailer => {
      trailer.addEventListener('click', e => {
        const movieId = e.currentTarget.dataset.movieid;
        e.preventDefault();
        return showTrailerById(movieId);
      });
    });
  }, 150);
}

export async function showTrailerById(id) {
  showLoader();

  const trailerUrl = await Api.getMovieThrillerUrlById(id);

  renderPlayer(trailerUrl);
  hideLoader();
}
function renderPlayer(link = '') {
  if (link !== 'https://www.youtube.com/embed/') {
    const trailerMarkup = `<div class="video-trailer" id="video-trailer-player">
    <iframe
      class="youtube trailer_video"
      width="1400"
      height="700"
      src="${link}"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>`;
    showBackdrop();
    backdropTrailer.insertAdjacentHTML('beforeend', trailerMarkup);

    backdropTrailer.addEventListener('click', removeTrailerHandle);
    document.addEventListener('keydown', onEscBtnClick);
  } else {
    withoutTrailer();
  }
}
function showBackdrop() {
  backdropTrailer.classList.remove('trailer-is-hidden');
}
function removeTrailerElement() {
  if (backdropTrailer.lastChild === null) return;
  backdropTrailer.classList.add('trailer-is-hidden');
  backdropTrailer.lastChild.remove();
}
function removeTrailerHandle(e) {
  if (e.target.nodeName === 'svg' || e.target.nodeName === 'use' || e.target.nodeName === 'DIV') {
    removeTrailerElement();
  }
}
function onEscBtnClick(e) {
  if (e.code === 'Escape') {
    removeTrailerElement();
  }
}
export default { showTrailerById };
