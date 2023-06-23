import axios from 'axios';

import { getKeyOfLatestThriller } from './utils.js';
import { error } from './notifications.js';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const api_key = '8ffc049be01c9ac683da541d3958668c';

const Api = {
  page: 1,
  results: 0,
  totalPages: 0,
  resultsCount: 20,
  language: 'en',

  getTrendingMovies: async () => {
    const data = await getData({
      request: '/trending/movie/week',
      params: { page: Api.page, language: Api.language },
    });

    Api.results = data.total_results;
    if (Api.results >= 10000) {
      Api.results = 10000;
    }

    Api.totalPages = data.total_pages;
    Api.resultsCount = Number(data.results.length);

    // DEV
    // console.log('TrendingMovies: ', data);
    // console.log('Trending => Result', Api.results, 'Page:', Api.totalPages);

    return data;
  },
  getMoviesBySearchQuery: async (searchQuery = '', include_adult = false) => {
    const data = await getData({
      request: '/search/movie',
      params: { page: Api.page, query: searchQuery, include_adult, language: Api.language },
    });

    Api.results = data.total_results;
    Api.totalPages = data.total_pages;
    Api.resultsCount = Number(data.results.length);

    // DEV
    // console.log('MoviesBySearchQuery: ', data);
    // console.log('SearchQuery => Result', Api.results, 'Page:', Api.totalPages);

    return data;
  },
  getMovieById: async movieId => {
    const data = await getData({
      request: `/movie/${movieId}`,
      params: { page: Api.page, language: Api.language },
    });

    // console.log('MovieById: ', data);

    return data;
  },
  getMovieThrillerUrlById: async movieId => {
    const data = await getData({
      request: `/movie/${movieId}/videos`,
      params: { page: Api.page, language: Api.language },
    });

    const thrillerBaseUrl = 'https://www.youtube.com/embed/';
    const thrillerKey = await getKeyOfLatestThriller(data);

    const thrillerUrl = `${thrillerBaseUrl}${thrillerKey}`;

    // console.log('thrillerUrl: ', thrillerUrl);

    return thrillerUrl;
  },
  getMoviesByGenre: async (genresID, include_adult = false) => {
    const data = await getData({
      request: '/discover/movie',
      params: {
        page: Api.page,
        include_adult,
        with_genres: genresID,
        sort_by: 'popularity.desc',
        language: Api.language,
      },
    });

    Api.results = data.total_results;
    if (Api.results >= 10000) {
      Api.results = 10000;
    }
    Api.totalPages = data.total_pages;
    Api.resultsCount = Number(data.results.length);

    // console.log('getMoviesByGenre: ', data);
    return data;
  },
  getGenresData: async language => {
    const data = await getData({
      request: '/genre/movie/list',
      params: { language },
    });

    // console.log(data.genres);
    return data.genres;
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
    error(err.request.status);
    // console.log(`ERROR getData(): `, err);
  }
}
