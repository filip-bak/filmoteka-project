import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import Api from './API.js';
import { renderCards, searchRenderCards } from './cards.js';
import { searchQuery } from './search-query.js';
import { ifAdult } from './button-filter.js';

const paginationItem = document.getElementById('pagination');
const options = {
  totalItems: Api.results,
  itemsPerPage: Api.resultsCount,
  visiblePages: 5,
  centerAlign: true,
  page: Api.page,
};
export const pagination = new Pagination(paginationItem, options);

pagination.on('beforeMove', event => {
  if (Api.results === 20000) {
    Api.results = Api.results - 10000;
  }
  Api.page = event.page;
  // pagination.reset(Api.results);
  pagination.setTotalItems(Api.results);
  if (Api.results === 20000) {
    Api.results = 10000;
  }
  if (searchQuery === '') {
    console.log('before:', Api.results);

    // pagination.setTotalItems(Api.results);

    console.log(Api.resultsCount);

    console.log(pagination);
    console.log('--------------------------');

    renderCards();

    return true;
  }
  if (searchQuery !== '') {
    console.log('Ebefore:', event);
    console.log('after Api.Results:', Api.results);
    console.log('after Page:', Api.page);

    console.log('resultsCount', Api.resultsCount);

    console.log(pagination);
    console.log('--------------------------');
    searchRenderCards(searchQuery, ifAdult);
    return true;
  }
});

pagination.on('afterMove', event => {
  // if (searchQuery !== '') {
  console.log('after', Api.results);
  const a = event.page;
  // if (a > 10) {
  //   return true;
  //   // return true;
  // }
  //   Api.page = event.page;
  //   console.log('after:', Api.results);
  //   console.log(Api.resultsCount);
  //   console.log(pagination);
  //   console.log('--------------------------');
  //   searchRenderCards(searchQuery, ifAdult);
  //   return false;
  // }
});

// Juz powinno działać znalazłem problem :D
// export function paginationRender(toRenderCards, toRenderQuery) {
//   pagination.on('afterMove', event => {
//     if (searchQuery === '') {
//       Api.page = event.page;

//       console.log('event: ', event);
//       console.log('page: ', Api.page);

//       toRenderCards();

//       return;
//     }

//     Api.page = event.page;
//     console.log('event: ', event);
//     console.log('page: ', Api.page);

//     toRenderQuery(searchQuery, ifAdult);
//   });
// }
// paginationRender(renderCards, searchRenderCards);
// pagination.on('afterMove', event => {
//   const currentPage = event.page;
//   Api.page = event.page;
//   console.log(Api.page);
//   // renderCards();
// });
