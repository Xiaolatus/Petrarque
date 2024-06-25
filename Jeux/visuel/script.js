document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const wordBoard = document.querySelector('.word-board');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-btn');
    // const volumeSlider = document.getElementById('volume-slider'); // Curseur de volume

    const cardData = [
        { word: 'chat', imgSrc: 'img/chat.png', audioSrc: 'sounds/chat.mp3' },
        { word: 'chien', imgSrc: 'img/chien.png', audioSrc: 'sounds/chien.mp3' },
        { word: 'corbeau', imgSrc: 'img/corbeau.png', audioSrc: 'sounds/corbeau.mp3' },
        { word: 'cochon', imgSrc: 'img/cochon.png', audioSrc: 'sounds/cochon.mp3' },
        { word: 'mouton', imgSrc: 'img/mouton.png', audioSrc: 'sounds/mouton.mp3' },
        { word: 'poule', imgSrc: 'img/poule.png', audioSrc: 'sounds/poule.mp3' },
        // Ajoutez plus d'animaux ici
    ];

    let selectedCard = null;
    let selectedWord = null;
    let matchedPairs = 0;
    let lockBoard = false;
    let isPlaying = false; // Variable pour suivre l'état de lecture de l'audio

    // let audioVolume = 0.5; // Volume initial

    function createCards() {
        cardData.forEach(data => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.word = data.word;
            card.innerHTML = `
                <img src="${data.imgSrc}" alt="${data.word}">
                <div class="volume-icon"></div>
            `;
            gameBoard.appendChild(card);

            const word = document.createElement('div');
            word.classList.add('word');
            word.dataset.word = data.word;
            word.textContent = data.word.charAt(0).toUpperCase() + data.word.slice(1);
            wordBoard.appendChild(word);
        });
    }

    function playSound(word) {
        const audioSrc = cardData.find(item => item.word === word).audioSrc;
        const audio = new Audio(audioSrc);

        audio.addEventListener('canplaythrough', () => {
            // audio.volume = audioVolume; // Définir le volume
            audio.play();
            isPlaying = true; // Mettre à jour l'état de lecture

            // Afficher le logo de volume
            const card = document.querySelector(`.card[data-word="${word}"]`);
            const volumeIcon = card.querySelector('.volume-icon');
            volumeIcon.style.display = 'block';
        });

        audio.addEventListener('ended', () => {
            isPlaying = false; // Réinitialiser l'état de lecture

            // Masquer le logo de volume
            const card = document.querySelector(`.card[data-word="${word}"]`);
            const volumeIcon = card.querySelector('.volume-icon');
            volumeIcon.style.display = 'none';
        });

        audio.load(); // Charger le fichier audio
    }

    function checkMatch() {
        if (selectedCard && selectedWord) {
            if (selectedCard.getAttribute('data-word') === selectedWord.getAttribute('data-word')) {
                selectedCard.classList.add('hidden');
                selectedWord.classList.add('hidden');
                matchedPairs++;
                resetSelections();
                if (matchedPairs === cardData.length) {
                    setTimeout(() => {
                        message.classList.remove('hidden');
                    }, 500);
                }
            } else {
                lockBoard = true;
                selectedCard.classList.add('error');
                selectedWord.classList.add('error');
                setTimeout(() => {
                    selectedCard.classList.remove('error', 'selected');
                    selectedWord.classList.remove('error', 'selected');
                    resetSelections();
                    lockBoard = false;
                }, 1000);
            }
        }
    }

    function resetSelections() {
        if (selectedCard) {
            selectedCard.classList.remove('selected');
            selectedCard = null;
        }
        if (selectedWord) {
            selectedWord.classList.remove('selected');
            selectedWord = null;
        }
    }

    function resetGame() {
        const cards = document.querySelectorAll('.card');
        const words = document.querySelectorAll('.word');

        cards.forEach(card => {
            card.classList.remove('hidden', 'error', 'selected');
        });

        words.forEach(word => {
            word.classList.remove('hidden', 'error', 'selected');
        });

        message.classList.add('hidden');
        matchedPairs = 0;
        lockBoard = false;
        resetSelections();
    }

    function setVolume(volume) {
        audioVolume = volume;
    }

    // // Écouteur d'événement pour le curseur de volume
    // volumeSlider.addEventListener('input', () => {
    //     const newVolume = parseFloat(volumeSlider.value);
    //     setVolume(newVolume);
    // });

    // Écouteur d'événement pour les clics sur les cartes et les mots
    gameBoard.addEventListener('click', event => {
        const card = event.target.closest('.card');
        if (card && !lockBoard && !isPlaying) {
            if (selectedCard === card) {
                selectedCard.classList.remove('selected');
                selectedCard = null;
            } else {
                if (selectedCard) {
                    selectedCard.classList.remove('selected');
                }
                selectedCard = card;
                selectedCard.classList.add('selected');
                playSound(selectedCard.dataset.word);
            }
            if (selectedWord) {
                checkMatch();
            }
        }
    });

    wordBoard.addEventListener('click', event => {
        const word = event.target.closest('.word');
        if (word && !lockBoard && !isPlaying) {
            if (selectedWord === word) {
                selectedWord.classList.remove('selected');
                selectedWord = null;
            } else {
                if (selectedWord) {
                    selectedWord.classList.remove('selected');
                }
                selectedWord = word;
                selectedWord.classList.add('selected');
                playSound(selectedWord.dataset.word);
            }
            if (selectedCard) {
                checkMatch();
            }
        }
    });

    resetButton.addEventListener('click', resetGame);

    createCards();
});
