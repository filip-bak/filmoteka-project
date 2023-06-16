const watchedBttn = document.querySelector('.grouped-buttons__wached')
const queueBttn = document.querySelector('.grouped-buttons__queue')


function watchedHandler() {
    if (!watchedBttn.classList.contains("grouped-buttons__watched--added")) {
        watchedBttn.textContent = "REMOVE FROM WATCHED"
        watchedBttn.classList.add("grouped-buttons__watched--added")
    } else {
        watchedBttn.textContent = "ADD TO WATCHED"
        watchedBttn.classList.remove("grouped-buttons__watched--added")
    }
}

function queueHandler() {
    if (!queueBttn.classList.contains("grouped-buttons__queue--added")) {
        queueBttn.textContent = "REMOVE FROM QUEUE"
        queueBttn.classList.add("grouped-buttons__queue--added")
    } else {
        queueBttn.textContent = "ADD TO QUEUE"
        queueBttn.classList.remove("grouped-buttons__queue--added")
    }
}


export function modalButtonChange() {  
    watchedBttn.addEventListener("click", watchedHandler)
    queueBttn.addEventListener("click", queueHandler)
}


