import { conforms } from 'lodash';
import Api from './API';
import { renderGenre } from './cards';
import { deleteSearchQueryError } from './search-error';
import { ifAdult } from './button-filter';
import { pagination } from './pagination';
import { searchInput } from './search-query';
import { hideLoader, showLoader } from './notifications';

export const genresEl = document.querySelector('.container-genres');

export let genreSearch = { active: false };
export let selectedGenre = { id: null };

export const handleGenreClick = async event => {
  try {
    if (event.target.nodeName !== 'A') {
      return;
    }
    showLoader();
    searchInput.value = '';

    selectedGenre = { id: event.target.dataset.genreId };

    document.querySelector('.genres--active')?.classList.remove('genres--active');

    event.target.classList.add('genres--active');

    Api.resetPage();
    pagination.reset(Api.results);

    genreSearch.active = true;

    deleteSearchQueryError();

    renderGenre(selectedGenre.id, ifAdult);
    hideLoader();
  } catch (err) {
    console.error(err);
  }
};

export function genresData(language) {
  const genreData = [];
  const genreApiData = Api.getGenresData(language);
  genreApiData.then(result => {
    genreData.push(...result);
  });
  return genreData;
}
