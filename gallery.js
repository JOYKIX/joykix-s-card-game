document.addEventListener('DOMContentLoaded', () => {
    loadSavedCards();
    loadDecks();
});

function navigateTo(page) {
    window.location.href = page;
}

function loadSavedCards() {
    const savedCardsContainer = document.getElementById('saved-cards');
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];

    savedCardsContainer.innerHTML = '';
    savedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.draggable = true;
        cardElement.dataset.cardId = card.id;
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <button onclick="deleteCard('${card.id}')">Supprimer</button>
        `;
        cardElement.addEventListener('dragstart', handleDragStart);
        cardElement.addEventListener('dragend', handleDragEnd);
        savedCardsContainer.appendChild(cardElement);
    });
}

function loadDecks() {
    const decksContainer = document.getElementById('decks');
    const decks = JSON.parse(localStorage.getItem('decks')) || [];

    decksContainer.innerHTML = '';
    decks.forEach(deck => {
        const deckElement = document.createElement('div');
        deckElement.className = 'deck';
        deckElement.innerHTML = `
            <p><strong>Deck:</strong> ${deck.name}</p>
            <p><strong>Cartes:</strong> ${deck.cards.length}</p>
            <button onclick="toggleDeckDetails('${deck.id}')">Voir</button>
            <button onclick="deleteDeck('${deck.id}')">Supprimer</button>
            <div id="deck-${deck.id}" class="deck-details drop-zone" data-deck-id="${deck.id}"></div>
        `;
        decksContainer.appendChild(deckElement);
    });

    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.cardId);
    event.target.classList.add('dragging');
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragging');
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragging');
}

function handleDrop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    const deckId = event.currentTarget.dataset.deckId;
    event.currentTarget.classList.remove('dragging');

    addToDeck(deckId, cardId);
}

function addToDeck(deckId, cardId) {
    const decks = JSON.parse(localStorage.getItem('decks')) || [];
    const deck = decks.find(d => d.id === deckId);

    if (deck && deck.cards.length < 40) {
        deck.cards.push(cardId);
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDeckDetails(deckId);
        loadDecks();
        alert('Carte ajoutée au deck !');
    } else if (deck) {
        alert('Le deck est plein (40 cartes max) !');
    } else {
        alert('Deck non trouvé !');
    }
}

function loadDeckDetails(deckId) {
    const decks = JSON.parse(localStorage.getItem('decks')) || [];
    const deck = decks.find(d => d.id === deckId);
    const deckDetails = document.getElementById(`deck-${deckId}`);
    deckDetails.innerHTML = '';

    if (deck) {
        deck.cards.forEach(cardId => {
            const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
            const card = savedCards.find(c => c.id === cardId);
            if (card) {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.innerHTML = `
                    <img src="${card.image}" alt="${card.name}">
                    <button onclick="removeFromDeck('${deck.id}', '${card.id}')">Retirer</button>
                `;
                deckDetails.appendChild(cardElement);
            }
        });
    }
}

function createDeck() {
    const deckName = document.getElementById('newDeckName').value;
    if (deckName) {
        const decks = JSON.parse(localStorage.getItem('decks')) || [];
        const newDeck = {
            id: Date.now().toString(),
            name: deckName,
            cards: []
        };
        decks.push(newDeck);
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDecks();
        document.getElementById('newDeckName').value = '';
    }
}

function toggleDeckDetails(deckId) {
    const deckDetails = document.getElementById(`deck-${deckId}`);
    if (deckDetails.classList.contains('active')) {
        deckDetails.classList.remove('active');
    } else {
        deckDetails.classList.add('active');
        loadDeckDetails(deckId);
    }
}

function removeFromDeck(deckId, cardId) {
    const decks = JSON.parse(localStorage.getItem('decks')) || [];
    const deck = decks.find(d => d.id === deckId);

    if (deck) {
        deck.cards = deck.cards.filter(id => id !== cardId);
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDeckDetails(deckId);
        loadDecks();
    }
}

function deleteCard(cardId) {
    let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    savedCards = savedCards.filter(card => card.id !== cardId);
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
    loadSavedCards();

    // Supprimer la carte de tous les decks
    let decks = JSON.parse(localStorage.getItem('decks')) || [];
    decks.forEach(deck => {
        deck.cards = deck.cards.filter(id => id !== cardId);
    });
    localStorage.setItem('decks', JSON.stringify(decks));
    loadDecks();
}

function deleteDeck(deckId) {
    let decks = JSON.parse(localStorage.getItem('decks')) || [];
    decks = decks.filter(deck => deck.id !== deckId);
    localStorage.setItem('decks', JSON.stringify(decks));
    loadDecks();
}
