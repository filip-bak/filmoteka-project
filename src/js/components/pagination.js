// import Pagination from 'tui-pagination';
// import Api from './API.js';
// import { renderCards, renderCardsFromLocalStorage, searchRenderCards } from './cards.js';
// import { searchQuery } from './search-query.js';
// import { ifAdult } from './button-filter.js';
// import { before } from 'lodash';

// const paginationItem = document.getElementById('pagination');
// if (paginationItem === null) return;
// const options = {
//   totalItems: 10000,
//   itemsPerPage: Api.resultsCount,
//   visiblePages: 5,
//   centerAlign: true,
//   page: Api.page,
// };
// export const pagination = new Pagination(paginationItem, options);

// // ---------------------------
// pagination.on('afterMove', event => {
//   let currentPage = event.page;
//   if (currentPage > Api.page) {
//     pagination.setTotalItems(10000);
//     pagination.movePageTo(Api.page);
//     currentPage = Api.page;
//     return false;
//   }
//   if (Api.totalPages < currentPage) {
//     Api.page = currentPage;
//   } else if (Api.totalPages > currentPage) {
//     Api.page = currentPage;
//   }
//   if (Api.page >= 500) Api.page = 500;
//   if (Api.page >= Api.totalPages) Api.page = Api.totalPages;

//   if (currentPage < Api.page) {
//     pagination.reset(Api.results);
//     currentPage = 500;
//     return false;
//   }
//   if (searchQuery === '') {
//     Api.page = Api.page;
//     currentPage = Api.page;
//     renderCards();
//   } else if (searchQuery !== '') {
//     // pagination.setTotalItems(Api.results);
//     Api.page = Api.page;
//     currentPage = Api.page;
//     searchRenderCards(searchQuery, ifAdult);
//   }
// });
// pagination.on('beforeMove', event => {
//   let currentPage = event.page;

//   Api.page = currentPage;
//   if (Api.totalPages > currentPage) {
//     pagination.reset(Api.results);
//     Api.page = Api.totalPages;
//     currentPage = Api.totalPages - 500;

//     // currentPage + 100;
//     return true;
//   }
//   if (Api.totalPages >= 500) {
//     Api.page = 499;
//     currentPage = 499;
//   }
//   if (Api.page >= 1000 || currentPage >= Api.page) {
//     pagination.setTotalItems(Api.results);
//     Api.page = 500;
//     currentPage = 500;
//   }
//   if (currentPage === Api.page) {
//     pagination.setTotalItems(Api.results);

//     return true;
//   } else {
//     Api.page = Api.totalPages;

//     return false;
//     return confirm('Go to page ' + currentPage + '?');
//   }
// });

// -----------------------

// pagination.reset(10000);

// pagination.on('beforeMove', event => {
//   const a = pagination.getCurrentPage();
//   console.log(a);
//   Api.page = event.page;
//   if (Api.totalPages < event.page) {
//     Api.page = Api.totalPages;
//     event.page = Api.totalPages;
//     Api.page = event.page;
//     console.log('1');
//     return true;
//   }
//   if (a < Api.page) {
//     Api.page = 500;
//     event.page = 500;

//     console.log('2');
//     return true;
//   }
// if (event.page > Api.page || Api.page > event.page) {
//   event.page = 500;
//   Api.page = 500;
//   pagination.reset(10000);
//   pagination.movePageTo(Api.totalPages);
//   return false;
// }

// if (event.page > Api.totalPages) {
//   Api.page = Api.totalPages;
//   event.page = Api.totalPages;
//   // event.page = Api.totalPages;
//   // event.page = Api.page;
// }
// if (event.page > Api.totalPages) {
//   Api.page = Api.totalPages;
//   event.page = Api.totalPages;
//   // event.page = Api.totalPages;
//   // event.page = Api.page;
// }

// alert(`Go to page ${Api.page}? event: ${event.page}`);
// pagination.reset();
// pagination.setTotalItems(Api.results);
// pagination.setItemsPerPage(Api.resultsCount);
// if (Api.totalPages > 1000) {
//   Api.totalPages - 500;
// }

// if (searchQuery === '') {
//   console.log('before:', Api.results);
//   console.log('event', event);
//   // pagination.reset();
//   // pagination.setTotalItems(Api.results);

//   // renderCards();

//   return true;
// }
// if (searchQuery !== '') {
//   console.log('before Api.Results:', Api.results);
//   console.log('before Page:', Api.page);

//   console.log(pagination);

//   // searchRenderCards(searchQuery, ifAdult);
//   return true;
// }
// });

// pagination.on('afterMove', event => {
//   if (searchQuery === '') {
//     //   if (event.page > Api.page && event.page > 500) {
//     //     event.page = Api.totalPages;
//     //     pagination.reset(Api.results);
//     //     pagination.movePageTo(Api.totalPages);
//     //     event.page = Api.page;
//     //     return false;
//     //   }
//     //   renderCards();
//     // }
//     if (searchQuery !== '') {
//       //   if (event.page > Api.page) {
//       //     pagination.reset(Api.results);
//       //     pagination.movePageTo(Api.totalPages);
//       //     event.page = Api.page;
//       //     return false;
//       //     searchRenderCards(searchQuery, ifAdult);
//     }

//     // pagination.movePageTo(Api.totalPages);
//     searchRenderCards(searchQuery, ifAdult);
//   }
//   // if (searchQuery !== '') {
//   // Api.page = event.page;
//   console.log('after Api.results', Api.results);
//   alert(`The current page is ${Api.page}! event: ${event.page}`);
// });

// THIS
// export function paginationRender(toRenderCards, toRenderQuery) {
//   pagination.on('afterMove', event => {
//     if (searchQuery === '') {
//       if (event.page > Api.page && event.page > 500) {
//         event.page = Api.totalPages;
//         pagination.reset(Api.results);
//         pagination.movePageTo(Api.totalPages);
//         event.page = Api.page;
//         return false;
//       }
//       renderCards();
//     }
//     if (searchQuery !== '') {
//       if (event.page > Api.page) {
//         pagination.reset(Api.results);
//         pagination.movePageTo(Api.totalPages);
//         event.page = Api.page;
//         return false;
//         searchRenderCards(searchQuery, ifAdult);
//       }

//       // pagination.movePageTo(Api.totalPages);
//       searchRenderCards(searchQuery, ifAdult);
//     }
//     // if (searchQuery !== '') {
//     // Api.page = event.page;
//     console.log('after Api.results', Api.results);
//     alert(`The current page is ${Api.page}! event: ${event.page}`);

//     if (searchQuery === '') {
//       Api.page = event.page;

//       console.log('event: ', event);
//       console.log('page: ', Api.page);
//       return true;

//       toRenderCards();
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
