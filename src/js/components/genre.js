import Api from './API';
import { ifAdult } from './button-filter';
import { renderGenre } from './cards';
import { hideLoader, showLoader } from './notifications';
import { pagination } from './pagination';
import { deleteSearchQueryError } from './search-error';
import { searchInput } from './search-query';

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

export function genresData() {
  const genreArray = [];
  const genreApiData = Api.getGenresData();
  genreApiData.then(result => {
    genreArray.push(...result);
  });
  return genreArray;
}
