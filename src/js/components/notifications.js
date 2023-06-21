import Notiflix from 'notiflix';

Notiflix.Notify.init({
  showOnlyTheLastOne: true,
  pauseOnHover: false,
  cssAnimationStyle: 'from-top',
});

Notiflix.Loading.init({
  backgroundColor: 'transparent',
  svgColor: '#ff6b08',
});

export function showLoader() {
  Notiflix.Loading.dots();
}

export function hideLoader() {
  Notiflix.Loading.remove();
}

export function addToWatched() {
  Notiflix.Notify.info(`Movie added to watched`);
}
export function addToQueue() {
  Notiflix.Notify.info(`Movie added to queue`);
}
export function removeFromWatched() {
  Notiflix.Notify.info(`Movie removed from watched`);
}
export function removeFromQueue() {
  Notiflix.Notify.info(`Movie removed from queue`);
}

export function success(totalMovies, query) {
  Notiflix.Notify.success(`Hooray, we found ${totalMovies} movies for "${query}"`, {
    timeout: 4000,
  });
}
export function error(query) {
  Notiflix.Notify.failure(`Error ${query}`);
}
export function failure(query) {
  Notiflix.Notify.failure(`Sorry, we couldn't find any results for ${query}`, {
    timeout: 4000,
  });
}

export function warning() {
  Notiflix.Notify.warning('The search engine is empty.You must enter a query', {
    timeout: 4000,
  });
}

export function withoutDetails() {
  Notiflix.Notify.failure('Details of this movie are not available', {
    timeout: 4000,
  });
}
export function withoutTrailer() {
  Notiflix.Notify.failure('Trailer is not available');
}

export function withoutMovieDescription() {
  Notiflix.Notify.failure('Movie description is not available');
}
