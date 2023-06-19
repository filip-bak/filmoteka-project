'use strict';

import Api from './components/API.js';
import './components/utils.js';
import { renderCards, searchRenderCards } from './components/cards.js';
import { elements } from './components/elements.js';
import './components/handlers.js';
import './components/local-storage.js';
import { theme } from './components/local-storage_theme-switch.js';
import './components/movie-modal.js';
import { showLoader, hideLoader } from './components/notifications.js';
import { ifAdult } from './components/button-filter.js';
import showTrailerById, { TrailersHandle } from './components/trailer.js';
import { modalButtonChange } from './components/movie-modal-library-buttons';
import { pagination, paginationRender } from './components/pagination.js';
import './components/search-query.js';
import './components/up-arrow.js';
import './components/trailer.js';

const app = {
  init: () => {
    window.addEventListener('load', app.load);
  },
  load: () => {
    showLoader();
    app.checkPage();
  },
  checkPage: () => {
    let page = document.body.id;
    switch (page) {
      case 'home':
        try {
          renderCards();
        } catch (e) {
          console.log(`renderCards() Error ${e}`);
        }
        // setTimeout(() => {
        //   pagination.reset(Api.results);
        //   // pagination.movePageTo(1);
        // }, 150);
        // paginationRender(renderCards, searchRenderCards);
        // pagination.setTotalItems(Api.results);
        // pagination.setItemsPerPage(Api.resultsCount);
        // potrzebne event Listener-y
        /*    -- TEST --
          Gdy potrzebujesz zobaczyć jak coś wygląda to pod tym piszesz i patrzysz czy działa,
          ALE NIE WYSYŁASZ NA GITHUB
        */

        hideLoader();
        break;
      case 'library':
        // renderCardsFromLocalStorage(); // z pliku cards.js w środku funkcji dostaje dane od API przez import

        // potrzebne event Listener-y

        /*    -- TEST --
          Gdy potrzebujesz zobaczyć jak coś wygląda
          to pod tym piszesz i patrzysz czy działa,
          ALE NIE WYSYŁASZ NA GITHUB
        */

        hideLoader();
        break;
    }
  },
};
app.init();
