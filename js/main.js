const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
    slides.forEach(s => s.classList.remove('active_slide'));
    slides[i].classList.add('active_slide');
}


document.getElementById('next').onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
};

// кнопка Prev
document.getElementById('prev').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
};

// 🔥 Автоматический слайдер
setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 3000); // каждые 3 секунды

const card = document.querySelector('.card')
const btnContainer = document.querySelector('.inner_card_switcher')

let cardId = 1
const firstCard = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        const data = await response.json()
        card.innerHTML = `
            <p>${data.title}</p>   
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>   
            <span>${data.id}</span>   
            `
    } catch (error) {
        console.error(error)
    }
}
firstCard(cardId)
btnContainer.onclick = (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
        if (event.target.id === 'btn-next') {
            cardId < 200 ? cardId++ : cardId = 1
        } else if (event.target.id === 'btn-prev') {
            cardId > 1 ? cardId-- : cardId = 200
        }
        firstCard(cardId)
    }
}
