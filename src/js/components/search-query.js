'use strict';

import { searchRenderCards } from './cards.js';
import { ifAdult } from './button-filter.js';
import _ from 'lodash';

let searchInput = document.querySelector('.header__search-input');

let searchQuery = '';
const debouncedSearch = _.debounce(debouncedSearchValue, 1000);

async function debouncedSearchValue() {
  searchQuery = searchInput.value;
  searchRenderCards(searchQuery, ifAdult);
}

async function textAreaHandler(e) {
  debouncedSearch(e);
  if (e.code === 'Enter') {
    searchQuery = e.currentTarget.value;
    debouncedSearch.cancel();
    searchRenderCards(searchQuery, ifAdult);
    return;
  }
}

searchInput.addEventListener('keyup', textAreaHandler);
