// Данные персонажей
const characters = [
    { url: "https://i.pinimg.com/1200x/02/77/77/0277773455d1304d5fa96b7c06c1db52.jpg", name: "Кан Тэ Му", description: "Глава компании." },
    { url: "https://i.pinimg.com/736x/d5/07/75/d50775b9f24ecece934fa80feb3c2d63.jpg", name: "Шин Ха Ри", description: "Весёлая сотрудница." },
    { url: "https://i.pinimg.com/736x/7e/65/d8/7e65d82a93ddf1b91b435332c59ba2a5.jpg", name: "Чха Сон Хун", description: "Спокойный секретарь." },
    { url: "https://i.pinimg.com/736x/a6/4c/79/a64c793cb96f170df6f10a244d1b6116.jpg", name: "Чжин Ён Со", description: "Решительная подруга." }
];

let currentIndex = 0;
let seconds = 0;
let timerInterval = null;

// DOM
const startGameBtn = document.getElementById("startGameBtn");
const endGameBtn = document.getElementById("endGameBtn");
const gameArea = document.getElementById("gameArea");
const characterImg = document.getElementById("characterImg");
const guessInput = document.getElementById("guessInput");
const checkGuess = document.getElementById("checkGuess");
const nextCharacter = document.getElementById("nextCharacter");
const guessResult = document.getElementById("guessResult");
const characterHint = document.getElementById("characterHint");
const timerDisplay = document.getElementById("timer");

// Показать изображение
function setImage(index) {
    characterImg.src = characters[index].url;
    guessInput.value = "";
    guessResult.textContent = "";
    characterHint.textContent = "";
}

// Таймер
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Время: ${seconds} сек`;
    }, 1000);
}

// Проверка
checkGuess.addEventListener("click", () => {
    const guess = guessInput.value.trim().toLowerCase();
    const correct = characters[currentIndex].name.toLowerCase();

    if (guess === correct) {
        guessResult.textContent = "Правильно! 🎉";
        guessResult.style.color = "#00cc66";
    } else {
        guessResult.textContent = "Неправильно!";
        guessResult.style.color = "#ff4444";
        characterHint.textContent = "Подсказка: " + characters[currentIndex].description;
    }
});

// Следующий персонаж
nextCharacter.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % characters.length;
    setImage(currentIndex);
});

// Start
startGameBtn.addEventListener("click", () => {
    gameArea.style.display = "block";
    startGameBtn.style.display = "none";
    endGameBtn.style.display = "inline-block";
    seconds = 0;
    timerDisplay.textContent = "Время: 0 сек";
    setImage(0);
    startTimer();
});

// End
endGameBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    gameArea.style.display = "none";
    endGameBtn.style.display = "none";
    startGameBtn.style.display = "inline-block";
});

setImage(0);
