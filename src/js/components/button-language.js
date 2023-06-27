import Api from './API.js';
import { ifAdult } from './button-filter.js';
import {
  renderCards,
  renderGenre,
  searchRenderCards,
  renderCardsWatched,
  renderCardsQueue,
} from './cards.js';
import { genreSearch, genresData, selectedGenre } from './genre.js';
import { searchQuery, searchInput } from './search-query.js';

export let genreData = null;

export const savedLanguage = localStorage.getItem('language');

const Languagebtn = document.querySelector('.btn-language');
const homeEl = document.querySelector('.header__home');
const libraryEl = document.querySelector('.header__my-library');
const footerTextEl = document.querySelector('.footer__text');
const footerBtn = document.querySelector('.team-btn');

const watchedBtn = document.querySelector('.btn-header--watched');
const queueBtn = document.querySelector('.btn-header--queue');

checkLanguage(Languagebtn);

function languageHandle() {
  if (this.classList.contains('btn-language--pl')) {
    localStorage.setItem('language', 'en');
    this.classList.remove('btn-language--pl');
    this.classList.add('btn-language--en');
    Api.language = 'en';
    genreData = genresData();
    languageChanges('en');
    validateLanguage();

    return;
  }
  if (this.classList.contains('btn-language--en')) {
    localStorage.setItem('language', 'pl');
    this.classList.remove('btn-language--en');
    this.classList.add('btn-language--pl');
    Api.language = 'pl';
    genreData = genresData();

    languageChanges('pl');
    validateLanguage();

    return;
  }
}

function checkLanguage(buttonEl) {
  if (savedLanguage === null) {
    Api.language = 'en';
    languageChanges('en');
    genreData = genresData();
    buttonEl.classList.add('btn-language--en');
    return;
  }

  if (savedLanguage === 'en') {
    buttonEl.classList.remove('btn-language--pl');
    buttonEl.classList.add('btn-language--en');
    Api.language = 'en';
    genreData = genresData();
    languageChanges('en');
    return;
  }
  if (savedLanguage === 'pl') {
    buttonEl.classList.remove('btn-language--en');
    buttonEl.classList.add('btn-language--pl');
    Api.language = 'pl';
    genreData = genresData();
    languageChanges('pl');
    return;
  }
}
function validateLanguage() {
  if (location.pathname === '/library.html') {
    renderCardsWatched();
    return;
  }
  if (genreSearch.active === true) {
    renderGenre(selectedGenre.id, ifAdult);
    return;
  }
  if (searchQuery === '') {
    renderCards();
    return;
  }
  if (searchQuery !== '') {
    searchRenderCards(searchQuery, ifAdult);
    return;
  }
}

export const languageMovieModalData = {
  en: {
    info: ['Vote / Votes', 'Popularity', 'Original Title', 'Genre'],
    details: 'About',
    buttons: {
      watched: ['ADD TO WATCH', 'REMOVE FROM WATCHED'],
      queue: ['ADD TO QUEUE', 'REMOVE FROM QUEUE'],
    },
  },
  pl: {
    info: ['Ocena', 'Popularność', 'Oryginalny tytuł', 'Gatunki'],
    details: 'Opis',
    buttons: {
      watched: ['Dodaj do obejrzanych', 'Usuń z Obejrzanych'],
      queue: ['Dodaj do obejrzenia', 'Usuń z do obejrzenia'],
    },
  },
};
function languageChanges(language) {
  const genreEl = document.querySelectorAll('.genres');
  const languageData = {
    header: { en: ['Home', 'My library'], pl: ['Strona główna', 'Biblioteka'] },
    headerLibrary: { en: ['Watched', 'Queue'], pl: ['Obejrzane', 'Do obejrzenia'] },
    input: { en: 'Movie search', pl: 'Wyszukaj film' },
    footer: {
      en: [' 2023 | All Rights Reserved |', 'Developed with', 'by GoIT Students'],
      pl: [' 2023 | Wszelkie prawa zastrzeżone |', 'Opracowany z', 'przez studentów GoIT'],
    },
    genreNames: [
      { en: 'Thriller', pl: 'Thriller' },
      { en: 'Romance', pl: 'Romans' },
      { en: 'Fantasy', pl: 'Fantasy' },
      { en: 'Action', pl: 'Akcja' },
      { en: 'Comedy', pl: 'Komedia' },
      { en: 'Family', pl: 'Familijny' },
      { en: 'Horror', pl: 'Horror' },
      { en: 'Crime', pl: 'Kryminał' },
      { en: 'Adventure', pl: 'Przygodowy' },
      { en: 'Science Fiction', pl: 'Sci-Fi' },
      { en: 'Drama', pl: 'Dramat' },
      { en: 'War', pl: 'Wojenny' },
      { en: 'Mystery', pl: 'Tajemnica' },
      // { en: 'Animation', pl: 'Animacja' },
      // { en: 'Documentary', pl: 'Dokumentalny' },
      // { en: 'History', pl: 'Historyczny' },
      // { en: 'Music', pl: 'Muzyczny' },
      // { en: 'TV Movie', pl: 'Film TV' },
      // { en: 'Western', pl: 'Western' },
    ],
  };

  if (language === 'en') {
    homeEl.textContent = languageData.header.en[0];
    libraryEl.textContent = languageData.header.en[1];
    footerTextEl.childNodes[2].textContent = languageData.footer.en[0];
    footerBtn.childNodes[2].textContent = languageData.footer.en[1];
    footerBtn.childNodes[4].textContent = languageData.footer.en[2];

    if (document.body.id === 'library') {
      watchedBtn.firstElementChild.textContent = languageData.headerLibrary.en[0];
      queueBtn.firstElementChild.textContent = languageData.headerLibrary.en[1];
      return;
    }
    genreEl.forEach((el, idx) => {
      el.textContent = languageData.genreNames[idx].en;
    });
    searchInput.placeholder = languageData.input.en;
  }
  if (language === 'pl') {
    // header
    homeEl.textContent = languageData.header.pl[0];
    libraryEl.textContent = languageData.header.pl[1];

    // footer
    footerTextEl.childNodes[2].textContent = languageData.footer.pl[0];
    footerBtn.childNodes[2].textContent = languageData.footer.pl[1];
    footerBtn.childNodes[4].textContent = languageData.footer.pl[2];

    // library page
    if (document.body.id === 'library') {
      watchedBtn.firstElementChild.textContent = languageData.headerLibrary.pl[0];
      queueBtn.firstElementChild.textContent = languageData.headerLibrary.pl[1];
      return;
    }
    // genre buttons
    genreEl.forEach((el, idx) => {
      el.textContent = languageData.genreNames[idx].pl;
    });
    // search input
    searchInput.placeholder = languageData.input.pl;
  }
}

Languagebtn.addEventListener('click', languageHandle);
