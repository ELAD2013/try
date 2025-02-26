const words = ['python', 'java', 'kotlin', 'javascript'];
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = new Set();
let attempts = 6;

const wordDisplay = document.getElementById('word-display');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

function displayWord() {
    wordDisplay.textContent = word.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (guessedLetters.has(guess)) {
        message.textContent = 'You already guessed that letter.';
    } else if (word.includes(guess)) {
        guessedLetters.add(guess);
        message.textContent = 'Good guess!';
    } else {
        guessedLetters.add(guess);
        attempts--;
        message.textContent = `Wrong guess! You have ${attempts} attempts left.`;
    }

    displayWord();
    attemptsDisplay.textContent = `Attempts left: ${attempts}`;

    if (!wordDisplay.textContent.includes('_')) {
        message.textContent = 'Congratulations! You guessed the word.';
        guessButton.disabled = true;
    } else if (attempts === 0) {
        message.textContent = `Game over! The word was '${word}'.`;
        guessButton.disabled = true;
    }
}

guessButton.addEventListener('click', checkGuess);
displayWord();