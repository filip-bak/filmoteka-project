// adding movie id to localstorage (add to watched, add to queue)
import Api from "./API";
// const watchedBttn = document.querySelector('.grouped-buttons__watched')
// const queueBttn = document.querySelector('.grouped-buttons__queue')
// import { watchedHandler, queueHandler } from "./movie-modal-library-buttons"

// const watchedList = ["697843", "385687", "603692"];
// const queueList = ["697843", "385687", "603692"];

// localStorage.setItem("watched", JSON.stringify(watchedList))
// localStorage.setItem("queue", JSON.stringify(queueList))

export function localStorageHandler() {
    console.log(`LOCAL STORAGE FUNCTION`)
    if (localStorage.getItem("watched") === null) {
        localStorage.setItem("watched","[]")
    }
    if (localStorage.getItem("queue") === null) {
        localStorage.setItem("queue","[]")
    }

    const watchedMovies = JSON.parse(localStorage.getItem("watched"))
    const queueMovies = JSON.parse(localStorage.getItem("queue"))

    const addToWatchedButton = document.querySelector('.grouped-buttons__watched')
    const addToQueueButton = document.querySelector('.grouped-buttons__queue')
    console.log(addToWatchedButton)
    console.log(addToQueueButton)
    
}




// async function createCardsFromLS(movieIDs) {
//     let moviesList = [];

//     // movieIDs.forEach(movieId => {
//     //     const result = Api.getMovieById(movieId)
//     //     console.log(result)
//     //     // moviesList.push(result)
//     // });
//     // console.log(moviesList)



//     const result = await Api.getMovieById(movieIDs)
//     console.log(result)
// }

// export function renderCardsWatched() {
//     console.log(`WATCHED BUTTON`)
//     // createCardsFromLS(JSON.parse(localStorage.getItem("watched")))
//     createCardsFromLS("697843")
// }

// export function renderCardsQueue() {
    
// }

// const modalwindow = document.querySelector('.backdrop')

// console.log(modalwindow)



// function addToWatched(movieID) {
//     console.log(`ADDING TO WATCHED`)

//     const watchedList = JSON.parse(localStorage.getItem("watched"))
    
//     watchedList.push(movieID)
//     console.log(watchedList)

//     localStorage.setItem("watched", JSON.stringify(watchedList))
// }

// function addToQueue(movieID) {
//     console.log(`ADDING TO QUEUE`)

//     const queueList = JSON.parse(localStorage.getItem("queue"))
    
//     queueList.push(movieID)
//     console.log(queueList)

//     localStorage.setItem("queue", JSON.stringify(queueList))
    
// }

// function removeFromWatched(movieID) {
//     console.log(`REMOVING FROM WATCHED`)
//     const watchedList = JSON.parse(localStorage.getItem("watched"))

//     watchedList.splice((watchedList.indexOf(movieID)), 1)
//     console.log(watchedList)
//     localStorage.setItem("watched", JSON.stringify(watchedList))

// }

// function removeFromQueue(movieID) {
//     console.log(`REMOVING FROM QUEUE`)
//     const queueList = JSON.parse(localStorage.getItem("queue"))

//     queueList.splice((queueList.indexOf(movieID)), 1)
//     console.log(queueList)
//     localStorage.setItem("queue", JSON.stringify(queueList))
// }

// function watchedBttnHandler() {
//     if (watchedBttn.classList.contains('grouped-buttons__watched--added')) {
//         removeFromWatched("502356")
//     } else {
//         addToWatched("502356")
//     }
//     watchedHandler()
// }

// function queueBttnHandler() {
//         if (queueBttn.classList.contains('grouped-buttons__queue--added')) {
//         removeFromQueue("502356")
//     } else {
//         addToQueue("502356")
//     }
//     queueHandler()
// }

// // if (window.getComputedStyle(modalwindow).display !== "none") {
// //     watchedBttn.addEventListener("click", watchedBttnHandler)
// //     queueBttn.addEventListener("click", queueBttnHandler)
// // } 


