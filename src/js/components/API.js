import axios from 'axios';

import { getKeyOfLatestThriller } from './utils';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const api_key = '8ffc049be01c9ac683da541d3958668c';

const Api = {
  page: 1,

  getTrendingMovies: async () => {
    const data = await getData({
      request: '/trending/movie/week',
      params: { page: Api.page },
    });

    console.log('TrendingMovies: ', data);

    return data;
  },
  getMoviesBySearchQuery: async (searchQuery = '', include_adult = false) => {
    const data = await getData({
      request: '/search/movie',
      params: { page: Api.page, query: searchQuery, include_adult },
    });

    console.log('MoviesBySearchQuery: ', data);

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
    const thrillerKey = getKeyOfLatestThriller(data);

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
