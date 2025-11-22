const container = document.querySelector('.character-list');

fetch('../data/characters.json')
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
            <img src="${character.url || ''}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>${character.description}</p>
        `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));
