'use strict';
import { TrailersHandle } from './trailer.js';
import { searchRenderCards, renderCards } from './cards.js';
import { showLoader, hideLoader, failure } from './notifications.js';
import { ifAdult } from './button-filter.js';
import _ from 'lodash';

let searchInput = document.querySelector('.header__search-input');

let searchQuery = '';
const debouncedSearch = _.debounce(debouncedSearchValue, 1000);

async function debouncedSearchValue() {
  showLoader();
  searchQuery = searchInput.value;
  if (searchQuery === '') {
    renderCards();
    hideLoader();
    return;
  }
  searchRenderCards(searchQuery, ifAdult);
  hideLoader();
}

async function imputHandler(e) {
  debouncedSearch();
  if (e.code === 'Enter') {
    searchQuery = e.currentTarget.value;
    debouncedSearch.cancel();
    searchRenderCards(searchQuery, ifAdult);
    return;
  }
}

searchInput.addEventListener('keyup', imputHandler);
