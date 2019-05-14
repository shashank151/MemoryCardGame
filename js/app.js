/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let cardHtmlList = [];
let i;
for (i = 0; i < cards.length; i++) {
    const a = cards[i].innerHTML;
    cardHtmlList.push(a);
}
let newCardHtmlList = shuffle(cardHtmlList);
for (i = 0; i < newCardHtmlList.length; i++) {
    cards[i].innerHTML = newCardHtmlList[i];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const restartGame = document.getElementById('restart');
restartGame.addEventListener('click', function () {
    document.location.reload(true);
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deck = document.querySelector('.deck');
deck.addEventListener('click', respondToTheClick);
let count = 0;
function respondToTheClick(event) {
    a = event.target.classList
    if (a[0] !== 'deck') {
        displayCard();
    }
    else {
        alert("Please Click on the card");
    }
}
function displayCard() {
    event.target.classList.add('open', 'show');
    addCardToOpenCardLsit(),5000;
}
let openCards = [];
let matchCards = [];
function addCardToOpenCardLsit() {
    if (openCards.length == 0) {
        openCards.push(event.target.innerHTML);
    }
    else {
        cardMatch();
    }
    // console.log(openCards);
}
function cardMatch() {
    let i;
    for (i = 0; i < openCards.length; i++) {
        if (openCards[i] === event.target.innerHTML) {
            let open = document.querySelectorAll('.open');
            for (let j = 0; j < open.length; j++) {
                open[j].classList.add('match');
                open[j].classList.remove('open', 'show');
            }
            count = count + 1;
            addMove();
            updateStar();
        }
        else {
            cardDoNotMatch(); 
            count = count + 1;
            addMove();
            updateStar();
        }
    }
    matchCards = matchCards + openCards;
    openCards = [];
    console.log(matchCards);
    console.log(openCards);
    winningCondition();
}
function cardDoNotMatch() {
    if (openCards.length == 1) {
        openCards.pop();
    }
    let open = document.querySelectorAll('.open');
    // console.log(open);
    for (let j = 0; j < open.length; j++) {
        open[j].classList.remove('open', 'show');
    }
}
function addMove() {
    let _move = document.getElementById('moves');
    _move.innerText = count;
}

function updateStar() {
    if (count == 11) {
        let _star = document.getElementsByClassName('fa-star');
        _star[2].classList.replace('fa-star', 'fa-star-half-o');
    }
    else if (count == 15) {
        let _star = document.getElementsByClassName('fa-star-half-o');
        _star[0].classList.replace('fa-star-half-o', 'fa-star-o');
    }
    else if (count == 18) {
        let _star = document.getElementsByClassName('fa-star');
        _star[1].classList.replace('fa-star', 'fa-star-half-o');
    }
    else if (count == 20) {
        let _star = document.getElementsByClassName('fa-star-half-o');
        _star[0].classList.replace('fa-star-half-o', 'fa-star-o');
    }
}
function winningCondition() {
    if (matchCards.length == 465) {
        let modal = document.getElementById('myModal');
        modal.style.display = 'block';
        let _move2 = document.getElementById('moves2');
        _move2.innerText = count;
        let _star2 = document.getElementById('stars2');
        if(count <= 10){
            _star2.innerText = "3 Stars";
        }
        else if (count > 10 && count <=15 ) {
            _star2.innerText = "2.5 Stars";
        }
        else if (count > 15 && count <=18) {
            _star2.innerText = "2 Stars";
        }
        else if (count > 18 && count <=20) {
            _star2.innerText = "1.5 Stars";
        }
        else  {
            _star2.innerText = "1 Star";
            } 
        let button = document.getElementById('modal-btn');
        button.addEventListener('click', function () {
            modal.style.display = 'none';
            document.location.reload(true);
        })
        
    }
}


