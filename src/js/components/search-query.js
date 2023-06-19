import { TrailersHandle } from './trailer.js';
import { searchRenderCards, renderCards } from './cards.js';
import { showLoader, hideLoader, failure } from './notifications.js';
import { ifAdult } from './button-filter.js';
import Api from './API.js';
import { pagination } from './pagination.js';
import _ from 'lodash';

let searchInput = document.querySelector('.header__search-input');

export let searchQuery = '';
const debouncedSearch = _.debounce(debouncedSearchValue, 1000);
async function debouncedSearchValue() {
  showLoader();
  searchQuery = searchInput.value;

  if (searchQuery === '') {
    console.log('1:', Api.results);

    Api.resetPage();
    renderCards();
    hideLoader();
    return;
  }
  if (searchQuery !== '') {
    if (Api.results === 20000) {
      Api.results = Api.results - 10000;
    }
    // console.log('MAIN:', Api.results);
    // pagination.reset(Api.results);
    // console.log('2:', Api.results);
    // pagination.reset(Api.results);
    Api.resetPage();
    searchRenderCards(searchQuery, ifAdult);
  }
  hideLoader();
}

async function imputHandler(e) {
  debouncedSearch();
  if (e.code === 'Enter') {
    console.log('3', Api.results);

    Api.resetPage();
    debouncedSearch.cancel();
    searchRenderCards(searchQuery, ifAdult);
    return;
  }
}
if (searchInput === null) {
  return;
}
searchInput.addEventListener('keyup', imputHandler);
searchInput.addEventListener('input', e => {
  // if (Api.results === 20000) {
  //   Api.results = 10000;
  // }
  // console.log('MAIN:', Api.results);
  // pagination.reset(Api.results);
});
