import Api from './API';
import { pagination } from './pagination';

const headerParagraph = document.querySelector('#hdr-err');
const paginationEl = document.querySelector('#pagination');


export function searchQueryError() {
  const placeholderBox = document.querySelector('#placeholder');
  placeholderBox.classList.add('placeholder-box--visiblity');
  headerParagraph.textContent = 'Search result not successful. Enter the correct movie name.';
  pagination.reset(Api.results);
  paginationEl.classList.add('is-hidden');
}
export function deleteSearchQueryError() {
  const placeholderBox = document.querySelector('#placeholder');
  placeholderBox.classList.remove('placeholder-box--visiblity');
  headerParagraph.textContent = '';
  paginationEl.classList.remove('is-hidden');
}
