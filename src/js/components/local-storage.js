// adding movie id to localstorage (add to watched, add to queue)
const watchedBttn = document.querySelector('.grouped-buttons__watched')
const queueBttn = document.querySelector('.grouped-buttons__queue')
import { watchedHandler, queueHandler } from "./movie-modal-library-buttons"
async function createCardsFromLS() {
    
}

function renderCardsWatched() {
    
}

function renderCardsQueue() {
    
}

function addToWatched() {
    
}

function addToQueue() {
    
}

function removeFromWatched() {
    
}

function removeFromQueue() {
    
}

function watchedBttnHandler() {
    

    if (watchedBttn.classList.contains('grouped-buttons__watched--added')) {
        console.log(`USUWAM Z LS`)
    } else {
        console.log(`DODAJĘ DO LS`)
    }
    watchedHandler()
}

function queueBttnHandler() {
    

        if (queueBttn.classList.contains('grouped-buttons__queue--added')) {
        console.log(`USUWAM Z LS`)
    } else {
        console.log(`DODAJĘ DO LS`)
    }
    queueHandler()
}

watchedBttn.addEventListener("click", watchedBttnHandler)
queueBttn.addEventListener("click", queueBttnHandler)
