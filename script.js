const topics = {
    programming: ['פייתון', 'גאווה', 'קוטלין', 'גאווהסקריפט', 'רובי', 'סוויפט', 'סי', 'סי פלוס פלוס'],
    animals: ['פיל', 'גירפה', 'קנגורו', 'דולפין', 'אריה', 'נמר', 'זברה', 'קרנף'],
    countries: ['ברזיל', 'קנדה', 'צרפת', 'גרמניה', 'ישראל', 'איטליה', 'יפן', 'סין']
};

let word = '';
let guessedLetters = new Set();
let attempts = 6;

const topicSelection = document.getElementById('topic-selection');
const startButton = document.getElementById('start-button');
const game = document.getElementById('game');
const wordDisplay = document.getElementById('word-display');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const restartButton = document.getElementById('restart-button');
const visitCountDisplay = document.getElementById('visit-count');

function chooseWord(topic) {
    const words = topics[topic];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordDisplay.textContent = word.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
}

function checkGuess() {
    const guess = guessInput.value;
    guessInput.value = '';

    if (guessedLetters.has(guess)) {
        message.textContent = 'כבר ניחשת את האות הזו.';
    } else if (word.includes(guess)) {
        guessedLetters.add(guess);
        message.textContent = 'ניחוש טוב!';
    } else {
        guessedLetters.add(guess);
        attempts--;
        message.textContent = `ניחוש שגוי! נותרו לך ${attempts} ניסיונות.`;
    }

    displayWord();
    attemptsDisplay.textContent = `ניסיונות שנותרו: ${attempts}`;

    if (!wordDisplay.textContent.includes('_')) {
        message.textContent = 'כל הכבוד! ניחשת את המילה.';
        guessButton.disabled = true;
        restartButton.style.display = 'block';
    } else if (attempts === 0) {
        message.textContent = `נגמר המשחק! המילה הייתה '${word}'.`;
        guessButton.disabled = true;
        restartButton.style.display = 'block';
    }
}

startButton.addEventListener('click', () => {
    const selectedTopic = document.getElementById('topics').value;
    const difficulty = document.getElementById('difficulty').value;
    word = chooseWord(selectedTopic);
    guessedLetters = new Set();
    attempts = difficulty === 'easy' ? 10 : 6;
    message.textContent = '';
    guessButton.disabled = false;
    restartButton.style.display = 'none';
    displayWord();
    attemptsDisplay.textContent = `ניסיונות שנותרו: ${attempts}`;
    topicSelection.style.display = 'none';
    game.style.display = 'block';
});

guessButton.addEventListener('click', checkGuess);

restartButton.addEventListener('click', () => {
    topicSelection.style.display = 'block';
    game.style.display = 'none';
});

function updateVisitCount() {
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
        visitCount = 0;
    }
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    visitCountDisplay.textContent = visitCount;
}

updateVisitCount();