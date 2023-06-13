import './sass/main.scss';
import { renderCards } from './js/components/cards.js';

const cardSpace = document.querySelector('.container')


try {
    renderCards()
} catch (e) {
    console.log(`Notification about the error ${e}`)
}