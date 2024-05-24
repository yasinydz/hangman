const wordElement = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const messageElSecond = document.getElementById('message');
const items = document.querySelectorAll('.item');
const playAgainBtn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["javascript", "java", "python"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordElement.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <div class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </div>
    `).join('')}`;

    const w = wordElement.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        messageEl.innerText = 'Tebrikler kazandınız.';
    }
}

function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler</h3>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}`;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        messageEl.innerText = 'Maalesef Kaybettiniz.';
    }
}

function displayMessage() {
    messageElSecond.classList.add('show');
    setTimeout(() => {
        messageElSecond.classList.remove('show');
    }, 2000);
}

playAgainBtn.addEventListener("click", () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
});

window.addEventListener('keydown', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

displayWord();
