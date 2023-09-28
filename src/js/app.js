'use strict';

import './components/API.js';
import './components/utils.js';
import { cardLibrarySpace } from './components/local-storage.js';
import { renderCards, cardSpace } from './components/cards.js';
import { handleGenreClick, genresEl } from './components/genre.js';
import './components/local-storage_theme-switch.js';
import { showModal } from './components/movie-modal.js';
import { showLoader, hideLoader } from './components/notifications.js';
import './components/button-filter.js';
import './components/trailer.js';
import './components/pagination.js';
import { renderCardsFromLocalStorage } from './components/cards.js';
import './components/button-language.js';
import './components/search-query.js';
import './components/up-arrow.js';
import './components/contributors-modal.js';
import './components/trailer.js';

const app = {
  init: () => {
    document.addEventListener('DOMContentLoaded', app.load);
  },
  load: () => {
    showLoader();
    app.checkPage();
  },
  checkPage: () => {
    let page = document.body.id;
    switch (page) {
      case 'home':
        renderCards();

        cardSpace.addEventListener('click', showModal);
        genresEl.addEventListener('click', handleGenreClick);

        hideLoader();
        break;
      case 'library':
        renderCardsFromLocalStorage();

        cardLibrarySpace.addEventListener('click', showModal);

        hideLoader();
        break;
    }
  },
};
app.init();
