var cards = document.querySelectorAll('.memory-card');
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var resetButton = document.querySelector('.reset');
var currentScore = 0;
var numberOfMatches = 0;
var bestScore = 0;
var previousBestScore = localStorage.getItem('bestScore');//THIS MIGHT BE NULL AND WILL NEVER SAVE BECAUSE LINE 47 IS FALSE
    console.log('previous best score is' + previousBestScore);

// // getting previous best score
//     if (localStorage.getItem('bestScore') === null){
//         previousBestScore = 0;
//     } else {
//         previousBestScore = localStorage.getItem('bestScore');
//     }
//     console.log('previous best score is' + previousBestScore);

// show bestScore
(function doGetBestScore(){
    getBestScore();
    console.log("got best score");
 })();

function getBestScore(){
    if (previousBestScore === null){
        console.log('Set to 0');
        document.querySelector('#bestScore').textContent = 0;
    } else {
        console.log('Set to local');
        document.querySelector('#bestScore').textContent = localStorage.getItem('bestScore');
    }
}

//reset button functionality
resetButton.addEventListener('click', () => {
    // document.querySelector('#currentScore').textContent = 0;
    getBestScore();
    currentScore = 0;
    lockBoard = true;
    for (var i = 0; i < cards.length; i++){
        cards[i].classList.remove('flip')
    }
    setTimeout(() => {
        resetBoard();
        addEventToCards();
        shuffle();
        lockBoard=false;
    }, 1000);
    console.log('resetted');
});
 

addEventToCards();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard){
        //first click
            hasFlippedCard = true;
            firstCard = this;
        //second click
    } else {
            hasFlippedCard = false;
            secondCard = this;
        //do cards match?
            if (firstCard.dataset.name === secondCard.dataset.name){
                //it's a match --> disable the card by removing event listener
                    firstCard.removeEventListener('click', flipCard);
                    secondCard.removeEventListener('click', flipCard);
                    resetBoard();
                    currentScore += 1;
                    numberOfMatches += 1;
                    if (numberOfMatches >= 1 && ((currentScore < previousBestScore) || (previousBestScore === null))){
                        localStorage.setItem('bestScore', currentScore);
                        previousBestScore = currentScore;
                    }
            } else {
                //not a match --> lock the board, unflip the card by removing the flip class, then unlock the board
                    lockBoard = true;
                    setTimeout(() => {
                        firstCard.classList.remove('flip');
                        secondCard.classList.remove('flip');
                        resetBoard();
                    }, 1000);
                    currentScore += 1;
                    
            }
    }
    document.querySelector('#currentScore').textContent =  currentScore;
    console.log('Set to local 94');
    document.querySelector('#bestScore').textContent = localStorage.getItem('bestScore')
}


function addEventToCards(){
for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', flipCard)
}
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//shuffles card as soon as page loads
(function doShuffle(){
   shuffle();
})();

function shuffle(){
    for (var i = 0 ; i < cards.length; i++){
        var randomPos = Math.floor(Math.random()* 20);
        cards[i].style.order = randomPos;
    }
};


//1. DONE Hit reset card flip back at new position instead of old position
//DONE 2. Refresh page, current score should be 0
// 3. Hit reset card should up date highscore if there is new high