// function renderModal(data) {} render on element
import Api from './API';
import { localStorageHandler } from './local-storage';
import { showLoader, hideLoader, withoutDetails } from './notifications';
import { getImg, getGenraByID } from './cards';

const wrapper = document.querySelector('.wrapper');

async function infoModal(ID, renderOn) {
  try {
    showLoader();

    const data = await Api.getMovieById(ID);
    let genresArray = [];
    data.genres.forEach(genre => {
      genresArray.push(genre.name);
    });

    let htmlString = `<div class="backdrop">
      <div class="modal">
        <div class="movie-form">
          <button type="button" class="close-btn">
            <svg class="close-btn__icon" width="30" height="30">
              <path stroke-width="2.1333" stroke-miterlimit="4" stroke-linecap="butt" stroke-linejoin="miter" d="M8.533 8.533l14.933 14.933"></path>
              <path stroke-width="2.1333" stroke-miterlimit="4" stroke-linecap="butt" stroke-linejoin="miter" d="M8.533 23.467l14.933-14.933"></path>
            </svg>
          </button>
          <div class="movie">
            <div class="movie-image__delay">${getImg(data.poster_path, true)}
            <div class="movie__description">
              <h2 class="movie__title">${data.title}</h2>
              <table class="table">
                <tbody>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--votes">Vote / Votes</p>
                    </td>
                    <td class="table__row-item-info">
                      <p class="table__row-data"><span class="table__row-span-orange">${
                        Math.round(data.vote_average * 10) / 10
                      }</span>&ensp;/&ensp;<span class="table__row-span-gray">${
      Math.round(data.vote_count * 10) / 10
    }</span></p>
                    </td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--popularity">Popularity</p>
                    </td>
                    <td class="table__row-item-info">
                      <p class="table__row-data">${Math.round(data.popularity * 10) / 10}</p>
                    </td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--original-title">Original Title</p>
                    </td>
                    <td class="table__row-item-info">
                      <p>${data.original_title}</p>
                    </td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--genre">Genre</p>
                    </td>
                    <td class="table__row-item-info">
                      <p>${genresArray.join(', ')}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="details__container">
                <h3 class="details">About</h3>
                <p class="details__description">
                  ${data.overview}
                </p>
              </div>
              <div class="grouped-buttons__delay">
                <button type="button" class="grouped-buttons grouped-buttons__watched" data-id="${
                  data.id
                }">
                  add to Watched
                </button>
                <button type="button" class="grouped-buttons grouped-buttons__queue" data-id="${
                  data.id
                }">
                  add to queue
                </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    renderOn.insertAdjacentHTML('afterend', htmlString);
    const backdrop = document.querySelector('.backdrop');
    const closeBtn = document.querySelector('.close-btn');

    document.addEventListener('click', event => {
      if (event.target.classList.contains('backdrop') === true) {
        closeAndRemoveModal(backdrop);
      }
    });

    document.addEventListener('keyup', event => {
      if (event.code === 'Escape') {
        closeAndRemoveModal(backdrop);
      }
    });

    closeBtn.addEventListener('click', () => {
      backdrop.classList.add('out');
      closeAndRemoveModal(backdrop);
    });

    localStorageHandler(data.id);

    hideLoader();
  } catch (e) {
    hideLoader();

    withoutDetails();
    console.log(`ERROR NOTIFICATION : ${e}`);
  }
}

function closeAndRemoveModal(backdrop) {
  backdrop.classList.add('out');
  setTimeout(() => {
    backdrop.remove();
  }, 2500);
}

export function showModal(event) {
  if (event.target.classList.contains('card__poster')) {
    let clickedMovieID = event.target.offsetParent.dataset.id;

    infoModal(clickedMovieID, wrapper);
  }
}
