import Notiflix from 'notiflix';
import Api from './API';
import { createCards, renderCards } from './cards';
import { getImg, getGenraByID } from './cards';
import { TrailersHandle } from './trailer';
import { showLoader, hide, hideLoader } from './notifications';

export const cardLibrarySpace = document.querySelector('.library-container');

export function localStorageHandler(movieID) {
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', '[]');
  }
  if (localStorage.getItem('queue') === null) {
    localStorage.setItem('queue', '[]');
  }

  const watchedMovies = JSON.parse(localStorage.getItem('watched'));
  const queueMovies = JSON.parse(localStorage.getItem('queue'));

  const addToWatchedButton = document.querySelector('.grouped-buttons__watched');
  const addToQueueButton = document.querySelector('.grouped-buttons__queue');

  if (watchedMovies.includes(movieID.toString())) {
    addToWatchedButton.classList.add('movie-added');
    addToWatchedButton.classList.add('button-active');
    addToWatchedButton.textContent = 'REMOVE FROM WATCHED';
  }

  addToWatchedButton.addEventListener('click', () => {
    const watchedList = JSON.parse(localStorage.getItem('watched'));
    if (addToWatchedButton.classList.contains('movie-added')) {
      watchedList.splice(watchedList.indexOf(addToWatchedButton.dataset.id), 1);
      localStorage.setItem('watched', JSON.stringify(watchedList));
      addToWatchedButton.textContent = 'ADD TO WATCH';
      addToWatchedButton.classList.remove('movie-added');
      addToWatchedButton.classList.remove('button-active');
    } else {
      watchedList.push(addToWatchedButton.dataset.id);
      localStorage.setItem('watched', JSON.stringify(watchedList));
      addToWatchedButton.textContent = 'REMOVE FROM WATCHED';
      addToWatchedButton.classList.add('movie-added');
      addToWatchedButton.classList.add('button-active');
    }
  });
  if (queueMovies.includes(movieID.toString())) {
    addToQueueButton.classList.add('movie-added');
    addToQueueButton.classList.add('button-active');
    addToQueueButton.textContent = 'REMOVE FROM QUEUE';
  }

  addToQueueButton.addEventListener('click', () => {
    const queueList = JSON.parse(localStorage.getItem('queue'));
    if (addToQueueButton.classList.contains('movie-added')) {
      queueList.splice(queueList.indexOf(addToQueueButton.dataset.id), 1);
      localStorage.setItem('queue', JSON.stringify(queueList));
      addToQueueButton.textContent = 'ADD TO QUEUE';
      addToQueueButton.classList.remove('movie-added');
      addToQueueButton.classList.remove('button-active');
    } else {
      queueList.push(addToQueueButton.dataset.id);
      localStorage.setItem('queue', JSON.stringify(queueList));

      addToQueueButton.textContent = 'REMOVE FROM QUEUE';
      addToQueueButton.classList.add('movie-added');
      addToQueueButton.classList.add('button-active');
    }
  });
}

async function getMovieData(ID) {
  try {
    const data = await Api.getMovieById(ID);
    createCards(data, cardLibrarySpace, true);
  } catch (e) {
    Notiflix.Notify.failure(
      `We're sorry, but we were not able to get the details of your requested movies.`,
    );
  }
}
export function getDataWatched() {
  try {
    showLoader();

    cardLibrarySpace.innerHTML = '';
    if (localStorage.getItem('watched') === null) {
      return;
    } else {
      const moviesIDs = JSON.parse(localStorage.getItem('watched'));
      const movieCards = [];
      for (const movieID of moviesIDs) {
        getMovieData(movieID);
      }
      TrailersHandle();
    }
    hideLoader();
  } catch (error) {
    Notiflix.Notify.warning(`Please, clear your local storage and review your library!`);
  }
}
export function getDataQueue() {
  showLoader();
  try {
    cardLibrarySpace.innerHTML = '';
    if (localStorage.getItem('queue') === null) {
      return;
    } else {
      const moviesIDs = JSON.parse(localStorage.getItem('queue'));
      const movieCards = [];
      for (const movieID of moviesIDs) {
        getMovieData(movieID);
      }
      TrailersHandle();
    }
    hideLoader();
  } catch (error) {
    Notiflix.Notify.warning(`Please, clear your local storage and review your library!`);
  }
}
