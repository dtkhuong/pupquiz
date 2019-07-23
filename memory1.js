var cards = document.querySelectorAll('.memory-card');
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var resetButton = document.querySelector('.reset');
var currentScore = 0;


function shuffle(){
    // console.log('shuffled');
    for (var i = 0 ; i < cards.length; i++){
        var randomPos = Math.floor(Math.random()* 20);
        cards[i].style.order = randomPos;
        console.log(randomPos);
    }
};

resetButton.addEventListener('click', shuffle);
 
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
            console.log(this);
        //do cards match?
            if (firstCard.dataset.name === secondCard.dataset.name){
                //it's a match --> disable the card by removing event listener
                    firstCard.removeEventListener('click', flipCard);
                    secondCard.removeEventListener('click', flipCard);
                    resetBoard();
                    currentScore += 1;
                    console.log(currentScore);
            } else {
                //not a match --> lock the board, unflip the card by removing the flip class, then unlock the board
                    lockBoard = true;
                    setTimeout(() => {
                        firstCard.classList.remove('flip');
                        secondCard.classList.remove('flip');
                        resetBoard();
                    }, 1500);
                    currentScore += 1;
                    console.log(currentScore);
                    
            }fm
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

(function shuffle(){
    for (var i = 0 ; i < cards.length; i++){
        var randomPos = Math.floor(Math.random()* 20);
        cards[i].style.order = randomPos;
        console.log(randomPos);
    }
})();
