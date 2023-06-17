import { withoutTrailer } from './notifications';

export async function getKeyOfLatestThriller(data) {
  let newData = [];
  let thrillerKey = '';

  if (typeof data === 'undefined') {
    withoutTrailer();
    return thrillerKey;
  }

  data.results.forEach(el => {
    if (el.type === 'Trailer') {
      newData.push({ key: el.key, type: el.type, date: el.published_at });
    }
  });

  const latestThrillerDate = new Date(
    Math.max(...newData.map(e => new Date(e.date))),
  ).toDateString();

  newData.forEach(el => {
    const thrillerDate = new Date(el.date).toDateString();

    if (thrillerDate === latestThrillerDate) {
      thrillerKey = el.key;
    }
  });
  return thrillerKey;
}
