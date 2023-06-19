// adding movie id to localstorage (add to watched, add to queue)
const watchedBttn = document.querySelector('.grouped-buttons__watched')
const queueBttn = document.querySelector('.grouped-buttons__queue')
import { watchedHandler, queueHandler } from "./movie-modal-library-buttons"

const watchedList = ["TEST", "TEST2", "TEST3"];
const queueList = ["TEST", "TEST2", "TEST3"];

localStorage.setItem("watched", JSON.stringify(watchedList))
localStorage.setItem("queue", JSON.stringify(queueList))

async function createCardsFromLS() {
    
}

function renderCardsWatched() {
    
}

function renderCardsQueue() {
    
}

function addToWatched(movieID) {
    console.log(`ADDING TO WATCHED`)

    const watchedList = JSON.parse(localStorage.getItem("watched"))
    
    watchedList.push(movieID)
    console.log(watchedList)

    localStorage.setItem("watched", JSON.stringify(watchedList))
}

function addToQueue(movieID) {
    console.log(`ADDING TO QUEUE`)

    const queueList = JSON.parse(localStorage.getItem("queue"))
    
    queueList.push(movieID)
    console.log(queueList)

    localStorage.setItem("queue", JSON.stringify(queueList))
    
}

function removeFromWatched(movieID) {
    console.log(`REMOVING FROM WATCHED`)
    const watchedList = JSON.parse(localStorage.getItem("watched"))

    watchedList.splice((watchedList.indexOf(movieID)), 1)
    console.log(watchedList)
    localStorage.setItem("watched", JSON.stringify(watchedList))

}

function removeFromQueue(movieID) {
    console.log(`REMOVING FROM QUEUE`)
    const queueList = JSON.parse(localStorage.getItem("queue"))

    queueList.splice((queueList.indexOf(movieID)), 1)
    console.log(queueList)
    localStorage.setItem("queue", JSON.stringify(queueList))
}

function watchedBttnHandler() {
    if (watchedBttn.classList.contains('grouped-buttons__watched--added')) {
        removeFromWatched("TEST4")
    } else {
        addToWatched("TEST4")
    }
    watchedHandler()
}

function queueBttnHandler() {
        if (queueBttn.classList.contains('grouped-buttons__queue--added')) {
        removeFromQueue("TEST4")
    } else {
        addToQueue("TEST4")
    }
    queueHandler()
}

watchedBttn.addEventListener("click", watchedBttnHandler)
queueBttn.addEventListener("click", queueBttnHandler)
