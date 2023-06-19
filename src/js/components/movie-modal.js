// function renderModal(data) {} render on element
import Api from './API';
import { getImageURL } from './cards';
import { cardSpace } from './cards';

const body = document.querySelector('#home');

async function infoModal(ID) {
  try {
    const data = await Api.getMovieById(ID);
    console.log(data);
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
            <div class="movie-image__delay">
              <div class="movie-image">
                <img src="${getImageURL(data.poster_path)}"
              </div>
            </div>
            <div class="movie__description">
              <h2 class="movie__title">${data.title}</h2>
              <table class="table">
                <tbody>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--votes">Vote / Votes</p>
                    </td>
                    <td class="table__row-item">
                      <p class="table__row-data">${data.vote_average} / ${data.vote_count}</p>
                    </td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--popularity">Popularity</p>
                    </td>
                    <td class="table__row-item">
                      <p class="table__row-data">${data.popularity}</p>
                    </td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--original-title">Original Title</p>
                    </td>
                    <td class="table__row-item">
                      <p>${data.original_title}</p>
                    </td>
                  </tr>
                  <tr class="table__row">
                    <td class="table__row-item">
                      <p class="table__title--genre">Genre</p>
                    </td>
                    <td class="table__row-item">
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
                <div class="grouped-buttons__delay">
                  <button type="button" class="grouped-buttons grouped-buttons__wached">
                    add to Watched
                  </button>
                  <button type="button" class="grouped-buttons grouped-buttons__queue">
                    add to queue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    body.insertAdjacentHTML('beforeend', htmlString);
  } catch (e) {
    console.log(`ERROR NOTIFICATION : ${e}`);
  }
}

export function showModal(event) {
  let clickedMovieID = event.target.parentNode.previousElementSibling.dataset.movieid;
  console.log(clickedMovieID);
  infoModal(clickedMovieID);
}
cardSpace.addEventListener('click', showModal);
