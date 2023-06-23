import { TrailersHandle } from './trailer.js';
import { searchRenderCards, renderCards } from './cards.js';
import { showLoader, hideLoader, failure } from './notifications.js';
import { ifAdult } from './button-filter.js';
import Api from './API.js';
import { pagination } from './pagination.js';
import _ from 'lodash';
import { deleteSearchQueryError } from './search-error.js';

export let searchInput = document.querySelector('.header__search-input');

export let searchQuery = '';
const debouncedSearch = _.debounce(debouncedSearchValue, 1000);
async function debouncedSearchValue() {
  showLoader();
  searchQuery = searchInput.value;

  if (searchQuery === '') {
    pagination.reset(Api.results);
    pagination.setTotalItems(Api.results);

    document.querySelector('.genres--active')?.classList.remove('genres--active');

    deleteSearchQueryError();
    Api.resetPage();

    renderCards();
    if (Api.page === 1) {
      pagination.reset(10000);
      pagination.setTotalItems(10000);
    }
    hideLoader();
    return;
  }
  if (searchQuery !== '') {
    pagination.reset(Api.results);
    pagination.setTotalItems(Api.results);

    document.querySelector('.genres--active')?.classList.remove('genres--active');

    Api.resetPage();
    if (Api.page === 1) {
      pagination.reset(10000);
      pagination.setTotalItems(10000);
    }
    searchRenderCards(searchQuery, ifAdult);
  }
  hideLoader();
}

async function imputHandler(e) {
  searchQuery = searchInput.value;
  debouncedSearch();
  if (e.code === 'Enter') {
    Api.resetPage();
    debouncedSearch.cancel();
    pagination.reset(Api.results);
    pagination.setTotalItems(Api.results);

    if (searchQuery === '') {
      pagination.reset(Api.results);
      pagination.setTotalItems(Api.results);
      pagination.setItemsPerPage(Api.resultsCount);
      Api.resetPage();
      deleteSearchQueryError();
      renderCards();
      hideLoader();
      return;
    }
    searchRenderCards(searchQuery, ifAdult);
    return;
  }

  pagination.reset(Api.results);
}
if (searchInput === null) {
  return;
}
searchInput.addEventListener('keyup', imputHandler);
