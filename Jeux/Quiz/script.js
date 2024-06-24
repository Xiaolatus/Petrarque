const questions = [
    {
        question: "Un tableau du peintre Vincent Van Gogh représente ces fleurs, desquelles s'agit-il ?",
        answers: [
            { text: "Les roses", correct: false },
            { text: "Les tournesols", correct: true },
            { text: "Les lilas", correct: false }
        ]
    },
    {
        question: "Quelle est la plus grande planète du système solaire ?",
        answers: [
            { text: "Terre", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturne", correct: false }
        ]
    },
    {
        question: "Qui a écrit 'Les Misérables' ?",
        answers: [
            { text: "Victor Hugo", correct: true },
            { text: "Émile Zola", correct: false },
            { text: "Gustave Flaubert", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let correctSelected = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultElement.classList.add('hide');
    questionElement.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    correctSelected = false;
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        correctSelected = true;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.classList.remove('selected'); // Retire la classe 'selected' de tous les boutons
    });
    selectedButton.classList.add('selected'); // Ajoute la classe 'selected' au bouton sélectionné
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionElement.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    nextButton.classList.add('hide');
    resultElement.classList.remove('hide');
    scoreElement.textContent = score;
    totalElement.textContent = questions.length;
}

nextButton.addEventListener('click', () => {
    if (correctSelected) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener('click', startQuiz);

startQuiz();
