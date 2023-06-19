import { TrailersHandle } from './trailer.js';
import { searchRenderCards, renderCards } from './cards.js';
import { showLoader, hideLoader, failure } from './notifications.js';
import { ifAdult } from './button-filter.js';
import Api, { validResults } from './API.js';
import { pagination } from './pagination.js';
import _, { compact } from 'lodash';
import { deleteSearchQueryError } from './search-error.js';

let searchInput = document.querySelector('.header__search-input');

export let searchQuery = '';
const debouncedSearch = _.debounce(debouncedSearchValue, 1000);
async function debouncedSearchValue() {
  showLoader();
  searchQuery = searchInput.value;

  if (searchQuery === '') {
    pagination.reset(Api.results);
    pagination.setTotalItems(Api.results);

    // pagination.reset();

    Api.resetPage();

    renderCards();
    hideLoader();
    deleteSearchQueryError();
    return;
  }
  if (searchQuery !== '') {
    pagination.reset(Api.results);
    pagination.setTotalItems(Api.results);

    // if (Api.results === 20000) {
    // work
    // pagination.reset(Api.results);
    // pagination.setTotalItems(Api.results);
    // }
    // pagination.reset();
    Api.resetPage();
    searchRenderCards(searchQuery, ifAdult);
  }
  hideLoader();
}

async function imputHandler(e) {
  searchQuery = searchInput.value;
  debouncedSearch();
  pagination.reset(Api.results);

  if (e.code === 'Enter') {
    Api.resetPage();
    debouncedSearch.cancel();
    pagination.reset(Api.results);
    pagination.setTotalItems(Api.results);

    if (searchQuery === '') {
      pagination.reset(Api.results);
      pagination.setTotalItems(Api.results);
      Api.resetPage();
      deleteSearchQueryError();
      renderCards();
      hideLoader();
      return;
    }
    searchRenderCards(searchQuery, ifAdult);
    return;
  }
  // pagination.reset(Api.results);
  // if (Api.results >= 10000) {
  //   console.log(Api.totalPages * Api.resultsCount);
  //   return Api.totalPages * Api.resultsCount;
  // }

  pagination.reset(Api.results);
}
if (searchInput === null) {
  return;
}
searchInput.addEventListener('keyup', imputHandler);
