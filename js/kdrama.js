fetch("../data/kdrama.json")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("kdramaList");

        data.kdramas.forEach(item => {
            // Создаем элемент карточки
            const card = document.createElement("div");
            card.classList.add("kdrama-card");
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.genre}</p>
                <p>${item.year}</p>
            `;

            // Добавляем клик по карточке
            card.addEventListener("click", () => {
                console.log("Клик на карточку:");
                console.log("Название:", item.title);
                console.log("Жанр:", item.genre);
                console.log("Год:", item.year);
            });

            // Вставляем карточку на страницу
            list.appendChild(card);
        });
    })
    .catch(err => console.error("Ошибка загрузки:", err));
