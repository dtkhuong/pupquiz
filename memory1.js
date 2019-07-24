var cards = document.querySelectorAll('.memory-card');
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var resetButton = document.querySelector('.reset');
var currentScore = 0;
var numberOfMatches = 0;
var bestScore = 0;
var previousBestScore = localStorage.getItem('bestScore');
    console.log('previous best score is' + previousBestScore);

// show bestScore
document.querySelector('#bestScore').textContent = localStorage.getItem('bestScore');

//reset button functionality
resetButton.addEventListener('click', () => {
    console.log('resetted');
    document.querySelector('#currentScore').textContent = 0;
    currentScore = 0;
    for (var i = 0; i < cards.length; i++){
        cards[i].classList.remove('flip')
    }
    shuffle();
});
 
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
                    if (numberOfMatches >= 10 && currentScore < previousBestScore){
                        localStorage.setItem('bestScore', currentScore);
                    }
            } else {
                //not a match --> lock the board, unflip the card by removing the flip class, then unlock the board
                    lockBoard = true;
                    setTimeout(() => {
                        firstCard.classList.remove('flip');
                        secondCard.classList.remove('flip');
                        resetBoard();
                    }, 1500);
                    currentScore += 1;
                    
            }
    }
    document.querySelector('#currentScore').textContent =  currentScore;
}



for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', flipCard)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//shuffles card as soon as page loads
(function shuffle(){
    for (var i = 0 ; i < cards.length; i++){
        var randomPos = Math.floor(Math.random()* 20);
        cards[i].style.order = randomPos;
    }
})();

function shuffle(){
    for (var i = 0 ; i < cards.length; i++){
        var randomPos = Math.floor(Math.random()* 20);
        cards[i].style.order = randomPos;
    }
};
