'use strict';

import Api from './API.js';
import { TrailersHandle } from './trailer.js';
import { failure } from './notifications.js';
import { pagination, paginationRender } from './pagination.js';
import { searchQueryError, deleteSearchQueryError } from './search-error.js';
import { getDataQueue, getDataWatched } from './local-storage.js';
export const cardSpace = document.querySelector('.container');

export function getImg(posterPath) {
  if (posterPath === null) {
    return `<div class="card__poster"></div>`;
  }
  return `<div><img src="https://image.tmdb.org/t/p/w500/${posterPath}" class="card__poster"/></div>`;
}

export function getGenraByID(ID) {
  const genreIdName = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];
  const movieGenras = [];
  const genraIDs = [];

  for (const genra of genreIdName) {
    genraIDs.push(genra.id);
  }
  if (ID === undefined) {
    return;
  }
  ID.forEach(el => {
    if (genraIDs.includes(el)) {
      const genraName = genreIdName.find(genra => genra.id === el);
      movieGenras.push(genraName.name);
    }
  });
  return movieGenras.join(', ');
}

export async function createCards(moviesDataFromAPI) {
  const movies = await moviesDataFromAPI.results;
  const moviesData = await movies
    .map(({ id, title, poster_path, genre_ids, release_date, vote_average }) => {
      return `<div class="card" data-id="${id}"><button class="btn-trailer" data-movieID="${id}">
  <a href="#" class="playTrail">
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
  </a>
</button>${getImg(poster_path)}<h2 class="card__title">${String(
        title,
      ).toUpperCase()}</h2><p class="card__description"><span class="card__tags">${getGenraByID(
        genre_ids,
      )}</span><span class="card__year">${String(release_date).slice(
        0,
        4,
      )}</span><span class="card__rating">${vote_average?.toFixed(2)}</span></p></div>`;
    })
    .join('');
  cardSpace.insertAdjacentHTML('beforeend', moviesData);
  TrailersHandle();
}

export async function renderCards() {
  try {
    cardSpace.innerHTML = '';
    const data = await Api.getTrendingMovies();

    createCards(data);
  } catch (e) {
    console.log(`ERROR NOTIFICATION : ${e}`);
  }
}
export async function searchRenderCards(searchQuery, ifAdult, render = Api.results) {
  try {
    cardSpace.innerHTML = '';
    const data = await Api.getMoviesBySearchQuery(searchQuery, ifAdult);
    if (data.results.length === 0) {
      searchQueryError();
      return;
    }
    deleteSearchQueryError();
    createCards(data);
  } catch (e) {
    console.log(`ERROR NOTIFICATION : ${e}`);
  }
}

function renderCardsWatched(){
  const watchedBttn = document.querySelector('.btn-header--watched')
  const queueBttn = document.querySelector('.btn-header--queue')
  watchedBttn.classList.add('btn-header--watched--active')
  queueBttn.classList.remove('btn-header--queue--active')
  getDataWatched()
}

function renderCardsQueue(){
  const watchedBttn = document.querySelector('.btn-header--watched')
  const queueBttn = document.querySelector('.btn-header--queue')
  watchedBttn.classList.remove('btn-header--watched--active')
  queueBttn.classList.add('btn-header--queue--active')
  getDataQueue()
  // createCards()
}

export function renderCardsFromLocalStorage() {
  renderCardsWatched()
  const watchedBttn = document.querySelector('.btn-header--watched')
  const queueBttn = document.querySelector('.btn-header--queue')
  watchedBttn.addEventListener("click", renderCardsWatched)
  queueBttn.addEventListener("click", renderCardsQueue)

}
