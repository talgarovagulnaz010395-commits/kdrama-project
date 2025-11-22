const ball = document.getElementById("ovalBall");
const episodeNumbersGroup = document.getElementById("episodeNumbers");
const episodeText = document.getElementById("currentEpisode");

// Параметры овала
const cx = 250;
const cy = 150;
const rx = 200;  // меньше, чем было
const ry = 100;  // меньше, чем было

const episodes = [
    "Ха Ри идёт на свидание вслепую и встречает Тэ Му.",
    "Тэ Му предлагает контракт на фиктивные отношения.",
    "Ха Ри боится разоблачения.",
    "Усложнения на работе.",
    "Начало истории Сон Хуна и Ён Со.",
    "Тэ Му проявляет заботу.",
    "Ха Ри теряется в своих чувствах.",
    "Тэ Му ревнует.",
    "Появляется Мин У.",
    "Дедушка узнаёт часть правды.",
    "Испытания отношений.",
    "Тёплый финал."
];

const totalEpisodes = episodes.length;
let angle = 0;
const speed = 0.01;
const offset = 20; // расстояние текста от овала
const episodeNumberElements = [];

// Создание номеров серий снаружи
for (let i = 0; i < totalEpisodes; i++) {
    const numText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    numText.textContent = i + 1;

    const pointAngle = (i / totalEpisodes) * 2 * Math.PI - Math.PI/2;
    const x = cx + (rx + offset) * Math.cos(pointAngle);
    const y = cy + (ry + offset) * Math.sin(pointAngle);

    numText.setAttribute("x", x);
    numText.setAttribute("y", y);
    episodeNumbersGroup.appendChild(numText);

    episodeNumberElements.push(numText);
}

// Анимация шарика
function animateOval() {
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);

    const episodeIndex = Math.floor((angle % (2 * Math.PI)) / (2 * Math.PI) * totalEpisodes);
    episodeText.textContent = `${episodeIndex + 1} серия: ${episodes[episodeIndex]}`;

    // Подсветка текущего номера
    episodeNumberElements.forEach((el, i) => {
        el.setAttribute("fill", i === episodeIndex ? "#ff5e8c" : "#ffffff");
    });

    angle += speed;
    requestAnimationFrame(animateOval);
}

animateOval();