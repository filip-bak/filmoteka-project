import contributorsInfo from './contributors-info';

const modalBtn = document.querySelector('.about-team-btn');
const modalContainer = document.getElementById('modal-container');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalContent = document.querySelector('.modal-content__list');
const modalCloseBtn = document.querySelector('.contributors-close-btn');

// auto create function
function createElement({ type, classes, textContent, append, href, attributes } = {}) {
  const el = document.createElement(type);
  if (classes) el.classList.add(...classes);
  if (append) append.appendChild(el);
  if (textContent) el.textContent = textContent;
  if (href) el.href = href;
  if (attributes) el.setAttribute(...attributes);
  return el;
}

// mapping through object array
const contributorElements = contributorsInfo.map(({ name, position, github, linkedin }) => {
  const contributorLi = createElement({ type: 'li', classes: ['modal-content__item'] });

  createElement({ type: 'div', classes: ['touch'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__1'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__2'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__3'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__4'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__5'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__6'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__7'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__8'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'touch__9'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'github-helper'], append: contributorLi });
  createElement({ type: 'div', classes: ['touch', 'linkedin-helper'], append: contributorLi });
  // div - end

  // card
  const cardElement = createElement({ type: 'div', classes: ['main'], append: contributorLi });

  // name
  createElement({
    type: 'h2',
    classes: ['modal-content__name'],
    textContent: name,
    append: cardElement,
  });
  // photo
  createElement({
    type: 'p',
    classes: ['modal-content__photo'],
    append: cardElement,
  });
  // role
  createElement({
    type: 'p',
    classes: ['modal-content__role'],
    textContent: position,
    append: cardElement,
  });
  // github
  createElement({
    type: 'a',
    classes: ['modal-content__link', 'github'],
    textContent: 'GitHub',
    href: github,
    attributes: ['target', '_blank'],
    append: cardElement,
  });
  // linkedin
  createElement({
    type: 'a',
    classes: ['modal-content__link', 'linkedin'],
    textContent: 'LinkedIn',
    href: linkedin,
    attributes: ['target', '_blank'],
    append: cardElement,
  });

  return contributorLi;
});

// inject content into modal
contributorElements.forEach(contributorElement => {
  modalContent.append(contributorElement);
});

//
//
//
// withdraw classes on click to open
modalBtn.addEventListener('click', function () {
  if (modalContainer.classList.contains('hidden')) {
    modalContainer.classList.remove('hidden');
  }
  modalContainer.classList.add('visible');
});
// withdraw classes on click to close
modalContainer.addEventListener('click', function (event) {
  if (event.target !== modalBackdrop) {
    return;
  }
  if (modalContainer.classList.contains('visible')) {
    modalContainer.classList.remove('visible');
  }
  modalContainer.classList.add('hidden');
});
// withdraw classes on esc button press to close
document.addEventListener('keyup', function (event) {
  if (event.code === 'Escape') {
    if (modalContainer.classList.contains('visible')) {
      modalContainer.classList.remove('visible');
    }
    modalContainer.classList.add('hidden');
  }
});

// modal close button
modalCloseBtn.addEventListener('click', function (event) {
  if (modalContainer.classList.contains('visible')) {
    modalContainer.classList.remove('visible');
  }
  modalContainer.classList.add('hidden');
});
