const memoryGame = document.querySelector('.memory-game');
const numCardsInput = document.getElementById('num-cards');
const startGameButton = document.getElementById('start-game');
const messageContainer = document.createElement('div');
const winMessage = document.createElement('div');
const resetButton = document.createElement('button');

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;

messageContainer.classList.add('message-container');
winMessage.classList.add('win-message');
resetButton.classList.add('reset-button');
winMessage.innerText = "Bravo vous avez gagné !";
resetButton.innerText = "Rejouer";
messageContainer.appendChild(winMessage);
messageContainer.appendChild(resetButton);
document.body.appendChild(messageContainer);
resetButton.addEventListener('click', resetGame);

startGameButton.addEventListener('click', () => {
    const numCards = parseInt(numCardsInput.value, 10);
    if (numCards % 2 !== 0) {
        alert("Veuillez entrer un nombre pair de cartes.");
        return;
    }
    startGame(numCards);
});

function startGame(numCards) {
    memoryGame.innerHTML = '';
    const frameworks = [
        'chat', 
        'cheval',
        'chien',  
        'cochon', 
        'coq',
        'Eléphant',
        'Grenouille',
        'lion',
        'mouette',
        'Perroquet',
        'poisson', 
        'singe'];
        shuffleArray(frameworks);  // Mélangez les frameworks
    const selectedFrameworks = frameworks.slice(0, numCards / 2);  // Sélectionnez un nombre approprié de frameworks
    const cardArray = [...selectedFrameworks, ...selectedFrameworks];
    shuffleArray(cardArray);  // Mélangez les cartes

    cardArray.forEach(framework => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.framework = framework;
        card.innerHTML = `
            <img class="front-face" src="img/${framework}.png" alt="${framework}" />
            <img class="back-face" src="img/logo.png" alt="JS Badge" />
        `;
        memoryGame.appendChild(card);
    });

    cards = document.querySelectorAll('.memory-card');
    adjustCardDimensions(numCards);
    cards.forEach(card => card.addEventListener('click', flipCard));
    resetGame();
}

function adjustCardDimensions(numCards) {
    let width, height;
    if (numCards <= 8) {
        width = height = 'calc(33.333% - 10px)';
    } else if (numCards <= 16) {
        width = height = 'calc(25% - 10px)';
    } else if (numCards <= 20) {
        width = height = 'calc(22% - 10px)';
    } else {
        width = height = 'calc(16.666% - 10px)';
    }
    cards.forEach(card => {
        card.style.width = width;
        card.style.height = height;
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        matchCount++;
        if (matchCount === cards.length / 2) {
            showWinMessage();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showWinMessage() {
    messageContainer.style.display = 'block';
}

function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    resetBoard();
    matchCount = 0;
    messageContainer.style.display = 'none';
    shuffle();
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
