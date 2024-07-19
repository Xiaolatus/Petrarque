const gameContainer = document.getElementById('gameContainer');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const targetScoreDisplay = document.getElementById('targetScore');
const timeLeftDisplay = document.getElementById('timeLeft');
let score = 0;
let gameInterval;
let appleInterval;
let mode;
let targetScore = 20;
let timeLimit = 30;
let timeLeft = 30;

gameContainer.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    let basketX = e.clientX - rect.left - basket.offsetWidth / 2;
    basketX = Math.max(0, Math.min(basketX, rect.width - basket.offsetWidth / 2));
    basket.style.left = `${basketX}px`;
});

function startGame(selectedMode) {
    mode = selectedMode;
    score = 0;
    timeLeft = timeLimit; // reset the time left
    scoreDisplay.textContent = `Score: ${score}`;
    targetScoreDisplay.style.display = 'none';
    timeLeftDisplay.style.display = 'none';
    clearIntervals();
    removeApples(); // remove any existing apples

    switch (mode) {
        case 'unlimited':
            startAppleFall();
            break;
        case 'scoreLimited':
            targetScoreDisplay.style.display = 'block';
            targetScoreDisplay.textContent = `Cible: ${targetScore}`;
            startAppleFall();
            gameInterval = setInterval(checkScoreLimit, 100);
            break;
        case 'timeLimited':
            timeLeftDisplay.style.display = 'block';
            timeLeftDisplay.textContent = `Temps restant: ${timeLeft}s`;
            startAppleFall();
            gameInterval = setInterval(updateTimeLimit, 1000);
            break;
    }
}

function clearIntervals() {
    clearInterval(gameInterval);
    clearInterval(appleInterval);
}

function removeApples() {
    const apples = document.querySelectorAll('.apple');
    apples.forEach(apple => apple.remove());
}

function startAppleFall() {
    appleInterval = setInterval(createApple, 1000);
}

function createApple() {
    const apple = document.createElement('div');
    apple.classList.add('apple');
    apple.style.left = `${Math.random() * (gameContainer.clientWidth - 30)}px`;
    gameContainer.appendChild(apple);

    let appleFallInterval = setInterval(() => {
        const appleTop = parseInt(apple.style.top || 0);
        if (appleTop + 30 >= gameContainer.clientHeight) {
            clearInterval(appleFallInterval);
            gameContainer.removeChild(apple);
        } else if (appleTop + 30 >= gameContainer.clientHeight - 50 && isAppleCaught(apple)) {
            clearInterval(appleFallInterval);
            gameContainer.removeChild(apple);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            apple.style.top = `${appleTop + 2}px`;
        }
    }, 10);
}

function isAppleCaught(apple) {
    const appleRect = apple.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    return (
        appleRect.left < basketRect.right &&
        appleRect.right > basketRect.left &&
        appleRect.bottom > basketRect.top
    );
}

function checkScoreLimit() {
    if (score >= targetScore) {
        endGame();
    }
}

function updateTimeLimit() {
    timeLeft--;
    timeLeftDisplay.textContent = `Temps restant: ${timeLeft}s`;
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearIntervals();
    alert(`Game Over! Your score is: ${score}`);
    resetGame();
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    targetScoreDisplay.style.display = 'none';
    timeLeftDisplay.style.display = 'none';
    removeApples();
}

// Commented out the setInterval outside of startGame since it starts apples falling right away
// setInterval(createApple, 1000);
