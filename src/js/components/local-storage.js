import Api from "./API"
import { createCards } from "./cards"
import { getImg, getGenraByID } from "./cards"

export const cardSpace = document.querySelector('.library-container')
const containerInnerHTML = [];

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

async function getMovieData(ID) {
    const data = await Api.getMovieById(ID)
    console.log(data)
    console.log(data.genres)
    const newIDs = data.genres.map(genre => genre.id)
    console.log(newIDs)
    const { id, title, poster_path, release_date, vote_average } = data
    const movieCard = `<div class="card" data-id="${id}"><button class="btn-trailer" data-movieID="${id}">
  <a href="#" class="playTrail">
    <svg
      x="0px"
      y="0px"
      width="50.7px"
      height="50.7px"
      viewBox="0 0 213.7 213.7"
      enable-background="new 0 0 213.7 213.7"
      xml:space="preserve"
    >
      <polygon
        class="playTrail--triangle"
        id="XMLID_18_"
        fill="none"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        points="
          73.5,62.5 148.5,105.8 73.5,149.1 "
      />
      <circle
        class="playTrail--circle"
        id="XMLID_17_"
        fill="none"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        cx="106.8"
        cy="106.8"
        r="103.3"
      />
    </svg>
  </a>
</button>${getImg(poster_path)}<h2 class="card__title">${String(
        title,
    ).toUpperCase()}</h2><p class="card__description"><span class="card__tags">${getGenraByID(
        newIDs
    )}</span><span class="card__year">${String(release_date).slice(
        0,
        4,
        )}</span><span class="card__rating">${vote_average?.toFixed(2)}</span></p></div>`;
    // console.log(movieCard)
    cardSpace.insertAdjacentHTML('beforeend', movieCard)
}
export function getDataWatched(){
    console.log(`watched data`)
    cardSpace.innerHTML=''
    if (localStorage.getItem("watched") === null) {
        console.log(`BRAK FILMÓW W WATCHED`)
        return
    } else {
        const moviesIDs = JSON.parse(localStorage.getItem("watched"))
        console.log(`MOVIED IDS: ${moviesIDs}`)
        const movieCards = [];
        for (const movieID of moviesIDs) {
            getMovieData(movieID)
        }
    }
}
export function getDataQueue(){
    console.log(`queue data`)
    cardSpace.innerHTML=''
    if (localStorage.getItem("queue") === null) {
        console.log(`BRAK FILMÓW W QUEUE`)
        return
    } else {
        const moviesIDs = JSON.parse(localStorage.getItem("queue"))
        console.log(`MOVIED IDS: ${moviesIDs}`)
        const movieCards = [];
        for (const movieID of moviesIDs) {
            getMovieData(movieID)
        }
    }
}