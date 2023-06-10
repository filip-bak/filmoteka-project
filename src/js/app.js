'use strict';

import './components/API';
import './components/cards';
import { elements } from './components/elements';
import './components/handlers';
import './components/local-storage';
import './components/movie-modal';
import { showLoader } from './components/notifications';
import './components/pagination';

export const app = {
  init: () => {
    document.addEventListener('DOMContentLoaded', app.load);
  },
  load: () => {
    // showLoader();
    app.checkPage();
  },
  checkPage: () => {
    let page = document.body.id;
    // prettier-ignore-start
    switch (page) {
      case 'home':
        // renderCards(); // z pliku cards.js w środku funkcji dostaje dane od API przez import

        // potrzebne event Listener-y

        /*    -- TEST --
          Gdy potrzebujesz zobaczyć jak coś wygląda to pod tym piszesz i patrzysz czy działa,
          ALE NIE WYSYŁASZ NA GITHUB
        */

        break;
      // prettier-ignore-end
      case 'library':
        // renderCardsFromLocalStorage(); // z pliku cards.js w środku funkcji dostaje dane od API przez import

        // potrzebne event Listener-y

        /*    -- TEST --
          Gdy potrzebujesz zobaczyć jak coś wygląda
          to pod tym piszesz i patrzysz czy działa,
          ALE NIE WYSYŁASZ NA GITHUB
        */

        break;
    }
  },
};
app.init();
