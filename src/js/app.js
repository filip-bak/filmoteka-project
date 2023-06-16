'use strict';

import Api from './components/API';
import './components/utils';
import { renderCards } from './components/cards';
import { elements } from './components/elements';
import './components/handlers';
import './components/local-storage';
import { theme } from './components/local-storage_theme-switch';
import './components/movie-modal';
import { showLoader, hideLoader } from './components/notifications';
import './components/pagination';
import { ifAdult } from './components/button-filter';

export const app = {
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
        try {
          renderCards();
        } catch (e) {
          console.log(`renderCards() Error ${e}`);
        }

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
