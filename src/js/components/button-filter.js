import { Confirm } from 'notiflix';
import Api from './API';
Confirm.init({
  titleColor: 'red',
});

const buttonFilter = document.querySelector('#button-filter');
const buttonFilterInput = document.querySelector('#mature');

export let ifAdult = false;

const accessMessage = {
  en: {
    title: 'Age Verification',
    message: 'To access +18 content,\n please confirm that you are 18 years or older.',
    Approved: 'Yes',
    Denied: 'No',
  },
  pl: {
    title: 'Weryfikacja wieku',
    message: 'Aby uzyskać dostęp do treści +18,\n proszę potwierdzić, że masz 18 lat lub więcej.',
    Approved: 'Tak',
    Denied: 'Nie',
  },
};

function confirmAccess(e) {
  e.preventDefault();

  buttonFilterInput.checked = ifAdult;

  const languageMessageCheck = Api.language === 'en' ? accessMessage.en : accessMessage.pl;

  if (ifAdult === false) {
    Confirm.show(
      languageMessageCheck.title,
      languageMessageCheck.message,
      languageMessageCheck.Approved,
      languageMessageCheck.Denied,
      () => {
        buttonFilterInput.checked = true;
        ifAdult = true;
        sessionStorage.setItem('mature-content', 'true');
      },
    );
  } else {
    buttonFilterInput.checked = false;
    ifAdult = false;
    sessionStorage.setItem('mature-content', 'false');
  }
}

if (buttonFilter === null) return;

if (sessionStorage.getItem('mature-content') === 'true') {
  buttonFilterInput.checked = true;
  ifAdult = true;
}

buttonFilter.addEventListener('click', confirmAccess);

// OLDER
// buttonFilter.addEventListener('click', () => {
//   if (ifAdult === false) {
//     ifAdult = true;
//     svgFilter.classList.add('filter-color-adult');
//   } else {
//     ifAdult = false;
//     svgFilter.classList.remove('filter-color-adult');
//   }
// });
