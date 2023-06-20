// adding movie id to localstorage (add to watched, add to queue)
import Api from "./API";
// const watchedBttn = document.querySelector('.grouped-buttons__watched')
// const queueBttn = document.querySelector('.grouped-buttons__queue')
// import { watchedHandler, queueHandler } from "./movie-modal-library-buttons"

// const watchedList = ["697843", "385687", "603692"];
// const queueList = ["697843", "385687", "603692"];

// localStorage.setItem("watched", "zzz"))
// localStorage.setItem("queue", JSON.stringify(queueList))

// function addToWatched() {
//     console.log(`ADDING TO WATCHED ${addToWatchedButton.dataset.id}`)


// }

function watchedButtonHandler() {
    console.log(`WATCHED BUTTON CLICKED`)
    const addToWatchedButton = document.querySelector('.grouped-buttons__watched')
    if (addToWatchedButton.classList.contains("movie-added")){
        addToWatchedButton.addEventListener("click", () => {
            console.log(`removing from ls`)
        })
    } else {
        addToWatchedButton.addEventListener("click", () => {
            console.log(`adding to ls`)
        })
    }
}

function queueButtonHandler() {
    console.log(`QUEUE BUTTON CLICKED`)
    const addToQueueButton = document.querySelector('.grouped-buttons__queue')
}

export function localStorageHandler(movieID) {
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


    if (watchedMovies.includes(movieID.toString())) {
        addToWatchedButton.classList.add('movie-added')
        addToWatchedButton.textContent="REMOVE FROM WATCHED"
    }

    addToWatchedButton.addEventListener("click", () => {
        const watchedList = JSON.parse(localStorage.getItem("watched"))
        if (addToWatchedButton.classList.contains('movie-added')) {
            watchedList.splice((watchedList.indexOf(addToWatchedButton.dataset.id)), 1)
            localStorage.setItem("watched", JSON.stringify(watchedList))
            addToWatchedButton.textContent = "ADD TO WATCH"
            addToWatchedButton.classList.remove('movie-added')
        } else {
            watchedList.push(addToWatchedButton.dataset.id)
            localStorage.setItem("watched", JSON.stringify(watchedList))
            addToWatchedButton.textContent = "REMOVE FROM WATCHED"
            addToWatchedButton.classList.add('movie-added')
        }
    })
    if (queueMovies.includes(movieID.toString())) {
        addToQueueButton.classList.add('movie-added')
        addToQueueButton.textContent="REMOVE FROM QUEUE"
    }

    addToQueueButton.addEventListener("click", () => {
        const queueList = JSON.parse(localStorage.getItem("queue"))
        if (addToQueueButton.classList.contains('movie-added')) {
            queueList.splice((queueList.indexOf(addToQueueButton.dataset.id)), 1)
            localStorage.setItem("queue", JSON.stringify(queueList))
            addToQueueButton.textContent = "ADD TO QUEUE"
            addToQueueButton.classList.remove('movie-added')
        } else {
            queueList.push(addToQueueButton.dataset.id)
            localStorage.setItem("queue", JSON.stringify(queueList))
            addToQueueButton.textContent = "REMOVE FROM QUEUE"
            addToQueueButton.classList.add('movie-added')
        }
    })
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





// function addToQueue(movieID) {
//     console.log(`ADDING TO QUEUE`)

//     const queueList = JSON.parse(localStorage.getItem("queue"))
    
//     queueList.push(movieID)
//     console.log(queueList)

//     localStorage.setItem("queue", JSON.stringify(queueList))
    
// }

// function removeFromWatched(movieID) {
//     console.log(`REMOVING FROM WATCHED`)


// }

// function removeFromQueue(movieID) {
//     console.log(`REMOVING FROM QUEUE`)
//     const queueList = JSON.parse(localStorage.getItem("queue"))

//     queueList.splice((queueList.indexOf(movieID)), 1)
//     console.log(queueList)
//     localStorage.setItem("queue", JSON.stringify(queueList))
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


