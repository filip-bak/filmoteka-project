import Pagination from 'tui-pagination';
import Api from './API.js';
import { showLoader, hideLoader } from './notifications.js';
import { renderCards, searchRenderCards, renderGenre } from './cards.js';
import { searchQuery } from './search-query.js';
import { ifAdult } from './button-filter.js';
import { genreSearch, selectedGenre } from './genre.js';

const paginationItem = document.getElementById('pagination');
if (paginationItem === null) return;
const options = {
  totalItems: 10000,
  itemsPerPage: Api.resultsCount,
  visiblePages: 5,
  centerAlign: true,
  page: Api.page,
};
export const pagination = new Pagination(paginationItem, options);

// ---------------------------
pagination.on('afterMove', event => {
  hideLoader();

  let currentPage = event.page;
  if (currentPage > Api.page) {
    pagination.setTotalItems(10000);
    pagination.movePageTo(Api.page);
    currentPage = Api.page;
    return false;
  }
  if (Api.totalPages < currentPage) {
    Api.page = currentPage;
  } else if (Api.totalPages > currentPage) {
    Api.page = currentPage;
  }
  if (Api.page >= 500) Api.page = 500;
  if (Api.page >= Api.totalPages) Api.page = Api.totalPages;

  if (currentPage < Api.page) {
    pagination.reset(Api.results);
    currentPage = 500;
    return false;
  }
  if (genreSearch.active === true) {
    Api.page = Api.page;
    currentPage = Api.page;
    renderGenre(selectedGenre.id, ifAdult);
    return;
  }
  if (searchQuery === '') {
    Api.page = Api.page;
    currentPage = Api.page;
    renderCards();
  } else if (searchQuery !== '') {
    Api.page = Api.page;
    currentPage = Api.page;
    searchRenderCards(searchQuery, ifAdult);
  }
});
pagination.on('beforeMove', event => {
  showLoader();

  let currentPage = event.page;

  Api.page = currentPage;
  if (Api.totalPages > currentPage) {
    pagination.setTotalItems(Api.results);
    Api.page = Api.totalPages;
    currentPage = Api.totalPages - 500;

    return true;
  }
  if (Api.totalPages >= 500) {
    Api.page = 499;
    currentPage = 499;
  }
  if (Api.page >= 1000 || currentPage >= Api.page) {
    pagination.setTotalItems(Api.results);
    Api.page = 500;
    currentPage = 500;
  }
  if (currentPage === Api.page) {
    pagination.setTotalItems(Api.results);

    return true;
  } else {
    Api.page = Api.totalPages;

    return false;
  }
});
