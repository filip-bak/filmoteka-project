import contributorsInfo from './contributors-info';

const modalBtn = document.querySelector('.about-team-btn');
const modalContainer = document.getElementById('modal-container');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

// inject content into modal
for (const contributorInfo of contributorsInfo) {
  Object.keys(contributorInfo).forEach(key => {
    const value = contributorInfo[key];
    modalContent.innerHTML += `<li class="modal-contributor">${key}: ${value}</li>`;
    // console.log(`value: ${value}`);
  });
}

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
