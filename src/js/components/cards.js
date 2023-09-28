'use strict';

import Api from './API.js';
import { genreData } from './button-language.js';
import { genreSearch } from './genre.js';
import { getDataQueue, getDataWatched, queueBtn, watchedBtn } from './local-storage.js';
import { error } from './notifications.js';
import { deleteSearchQueryError, searchQueryError } from './search-error.js';
import { TrailersHandle } from './trailer.js';
export const cardSpace = document.querySelector('.container');

export function getImg(posterPath, isMovieModal = false) {
  if (isMovieModal) {
    if (posterPath === null) {
      return `<div class="movie-image movie__poster"></div>`;
    }
    return `<div class="movie-image"><img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="movie-image__img"/></div>`;
  }
  if (posterPath === null) {
    return `<div class="card__poster"></div>`;
  }
  return `<div><img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card__poster"/></div>`;
}

export function getGenraByID(ID, genres, isFromID = false) {
  // const genreData = [
  //   { id: 28, name: 'Action' },
  //   { id: 12, name: 'Adventure' },
  //   { id: 16, name: 'Animation' },
  //   { id: 35, name: 'Comedy' },
  //   { id: 80, name: 'Crime' },
  //   { id: 99, name: 'Documentary' },
  //   { id: 18, name: 'Drama' },
  //   { id: 10751, name: 'Family' },
  //   { id: 14, name: 'Fantasy' },
  //   { id: 36, name: 'History' },
  //   { id: 27, name: 'Horror' },
  //   { id: 10402, name: 'Music' },
  //   { id: 9648, name: 'Mystery' },
  //   { id: 10749, name: 'Romance' },
  //   { id: 878, name: 'Science Fiction' },
  //   { id: 10770, name: 'TV Movie' },
  //   { id: 53, name: 'Thriller' },
  //   { id: 10752, name: 'War' },
  //   { id: 37, name: 'Western' },
  // ];

  if (isFromID) {
    let genresArray = [];
    genres.forEach(genre => {
      genresArray.push(genre.name);
    });
    return genresArray.join(', ');
  }

  const movieGenras = [];

  const genraIDs = genreData.map(genre => genre.id);

  if (ID === undefined) {
    return;
  }
  ID.forEach(id => {
    if (genraIDs.includes(id)) {
      const genraName = genreData.find(genra => genra.id === id);
      movieGenras.push(genraName.name);
    }
  });
  return movieGenras.join(', ');
}

export async function createCards(moviesDataFromAPI, onElementToRender, fromID = false) {
  let movies = await moviesDataFromAPI.results;
  if (fromID === true) {
    movies = [await moviesDataFromAPI];
  }
  const moviesData = await movies
    .map(({ id, title, poster_path, genre_ids, genres, release_date, vote_average }) => {
      return `<div class="card" data-id="${id}"><button class="btn-trailer playTrail" data-movieID="${id}">
    <svg
      x="0px"
      y="0px"
      width="50.7px"
      height="50.7px"
      viewBox="0 0 213.7 213.7"
      enable-background="new 0 0 213.7 213.7"
      xml:space="preserve"
    >
      <polygon
        class="playTrail--triangle"
        id="XMLID_18_"
        fill="none"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        points="
          73.5,62.5 148.5,105.8 73.5,149.1 "
      />
      <circle
        class="playTrail--circle"
        id="XMLID_17_"
        fill="none"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        cx="106.8"
        cy="106.8"
        r="103.3"
      />
    </svg>
</button>${getImg(poster_path)}<h2 class="card__title">${String(
        title,
      ).toUpperCase()}</h2><p class="card__description"><span class="card__tags">${
        getGenraByID(genre_ids, genres, fromID) || ''
      }</span><span class="card__year">${
        String(release_date).slice(0, 4) === 'unde' ? '' : String(release_date).slice(0, 4)
      }</span><span class="card__rating">${vote_average?.toFixed(2) || '0.00'}</span></p></div>`;
    })
    .join('');
  onElementToRender.insertAdjacentHTML('beforeend', moviesData);
}

export async function renderCards() {
  try {
    cardSpace.innerHTML = '';
    genreSearch.active = false;
    const data = await Api.getTrendingMovies();

    createCards(data, cardSpace);
    TrailersHandle();
  } catch (e) {
    // withoutDetails();
    // error(e.request.status);
    console.log(`ERROR NOTIFICATION : ${e}`);
  }
}
export async function searchRenderCards(searchQuery, ifAdult) {
  try {
    cardSpace.innerHTML = '';
    genreSearch.active = false;
    const data = await Api.getMoviesBySearchQuery(searchQuery, ifAdult);

    if (data.results.length === 0) {
      searchQueryError();
      return;
    }
    deleteSearchQueryError();
    createCards(data, cardSpace);
    TrailersHandle();
  } catch (e) {
    error(e.request.status);
    // console.log(`ERROR NOTIFICATION : ${e}`);
  }
}
export async function renderGenre(genreID, ifAdult) {
  try {
    cardSpace.innerHTML = '';
    const data = await Api.getMoviesByGenre(genreID, ifAdult);

    createCards(data, cardSpace);
    TrailersHandle();
  } catch (e) {
    error(e.request.status);
    // console.log(`ERROR NOTIFICATION : ${e}`);
  }
}

export function renderCardsWatched() {
  watchedBtn.classList.add('btn-header--watched--active');
  queueBtn.classList.remove('btn-header--queue--active');
  getDataWatched();
}

export function renderCardsQueue() {
  watchedBtn.classList.remove('btn-header--watched--active');
  queueBtn.classList.add('btn-header--queue--active');
  getDataQueue();
  // createCards()
}

export function renderCardsFromLocalStorage() {
  renderCardsWatched();
  watchedBtn.addEventListener('click', renderCardsWatched);
  queueBtn.addEventListener('click', renderCardsQueue);
}
