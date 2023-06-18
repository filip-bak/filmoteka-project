'use strict';

const headerParagraph = document.querySelector('#hdr-err');
export function searchQueryError() {
  headerParagraph.textContent = 'Search result not successful. Enter the correct movie name.';
}
export function deleteSearchQueryError() {
  headerParagraph.textContent = '';
}
