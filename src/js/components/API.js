import axios from 'axios';

import { getKeyOfLatestThriller } from './utils.js';

// import { pagination } from './pagination.js'

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const api_key = '8ffc049be01c9ac683da541d3958668c';
console.log(pagination);
// (1000/2) / 20000 * 1000; -> 25
//14 265
// 14/2 / 265 * 14 ->
// 20* 13 = 260
const Api = {
  page: 1,
  results: 10000,
  resultsCount: 20,

  getTrendingMovies: async () => {
    const data = await getData({
      request: '/trending/movie/week',
      params: { page: Api.page },
    });

    // if (totalPages % 2 !== 0) {
    //   console.log('test:', totalPages, Math.round(totalPages / 2));
    //   // totalPages = console.log('nieparzusta');
    // }

    Api.resultsCount = Number(data.results.length);
    Api.results = data.total_results;
    console.log(Api.results);

    console.log('TrendingMovies: ', data);
    console.log('results:', Api.resultsCount);

    return data;
  },
  getMoviesBySearchQuery: async (
    searchQuery = '',
    include_adult = false,
  ) => {
    const data = await getData({
      request: '/search/movie',
      params: { page: Api.page, query: searchQuery, include_adult },
    });

    Api.resultsCount = Number(data.results.length);

    Api.results = data.total_results;
    console.log(Api.results);
    // setTimeout(() => {
    // totalPages = Math.min(data.total_pages, 10);
    // });
    // totalPages = Math.min(data.total_pages, 10);

    // pagination.reset(totalPages);

    console.log('MoviesBySearchQuery: ', data);
    // console.log('total:', Api.results);
    console.log('results:', Api.resultsCount);
    return data;
  },
  getMovieById: async movieId => {
    const data = await getData({
      request: `/movie/${movieId}`,
      params: { page: Api.page },
    });

    console.log('MovieById: ', data);

    return data;
  },
  getMovieThrillerUrlById: async movieId => {
    const data = await getData({
      request: `/movie/${movieId}/videos`,
      params: { page: Api.page },
    });

    const thrillerBaseUrl = 'https://www.youtube.com/embed/';
    const thrillerKey = await getKeyOfLatestThriller(data);

    const thrillerUrl = `${thrillerBaseUrl}${thrillerKey}`;

    console.log('thrillerUrl: ', thrillerUrl);

    return thrillerUrl;
  },

  resetPage: () => {
    Api.page = 1;
  },
};
export default Api;

async function getData({ request, params } = {}) {
  try {
    const apiParams = new URLSearchParams(params);

    const response = await axios.get(`${request}?api_key=${api_key}&${apiParams}`);
    return response.data;
  } catch (err) {
    console.log(`ERROR getData(): `, err);
  }
}
