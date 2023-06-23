'use strict';

import Api from './components/API.js';
import './components/utils.js';
import { handleGenreClick, genresEl } from './components/genre.js';
import { renderCards, searchRenderCards, cardSpace } from './components/cards.js';
import { cardLibrarySpace } from './components/local-storage.js';
import { theme } from './components/local-storage_theme-switch.js';
import { showModal, showModalLibrary } from './components/movie-modal.js';
import { showLoader, hideLoader } from './components/notifications.js';
import { ifAdult } from './components/button-filter.js';
import showTrailerById, { TrailersHandle } from './components/trailer.js';
import { pagination, paginationRender } from './components/pagination.js';
import { renderCardsFromLocalStorage } from './components/cards.js';
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
