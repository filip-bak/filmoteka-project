import Notiflix from 'notiflix';
import Api from './API';

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
  if (Api.language === 'en') {
    Notiflix.Notify.info(`Movie added to watched`);
    return;
  }
  if (Api.language === 'pl') {
    Notiflix.Notify.info(`Film dodany do obejrzanych`);
    return;
  }
}
export function removeFromWatched() {
  if (Api.language === 'en') {
    Notiflix.Notify.info(`Movie removed from watched`);
    return;
  }
  if (Api.language === 'pl') {
    Notiflix.Notify.info(`Film usunięty z obejrzanych`);
    return;
  }
}
export function addToQueue() {
  if (Api.language === 'en') {
    Notiflix.Notify.info(`Movie added to queue`);
    return;
  }
  if (Api.language === 'pl') {
    Notiflix.Notify.info(`Film dodany do obejrzenia`);
    return;
  }
}
export function removeFromQueue() {
  if (Api.language === 'en') {
    Notiflix.Notify.info(`Movie removed from queue`);
    return;
  }
  if (Api.language === 'pl') {
    Notiflix.Notify.info(`Film usunięty z do obejrzenia`);
    return;
  }
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
  if (Api.language === 'en') {
    Notiflix.Notify.failure('Details of this movie are not available', {
      timeout: 4000,
    });
    return;
  }
  if (Api.language === 'pl') {
    Notiflix.Notify.failure('Szczegóły tego filmu nie są dostępne');
    return;
  }
}
export function withoutTrailer() {
  if (Api.language === 'en') {
    Notiflix.Notify.failure('Trailer is not available');
    return;
  }
  if (Api.language === 'pl') {
    Notiflix.Notify.failure('Trailer jest niedostępny');
    return;
  }
}

export function withoutMovieDescription() {
  Notiflix.Notify.failure('Movie description is not available');
}
