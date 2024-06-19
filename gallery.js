document.addEventListener('DOMContentLoaded', () => {
    loadSavedCards();
    loadDecks();
    loadDeckOptions();
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
        cardElement.dataset.cardId = card.id;
        cardElement.dataset.rank = card.rank;
        cardElement.dataset.level = card.level;
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <button onclick="addToSelectedDeck('${card.id}')">Ajouter au deck</button>
            <button onclick="deleteCard('${card.id}')">Supprimer</button>
        `;
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
            <button onclick="renameDeckPrompt('${deck.id}')">Renommer</button>
            <div id="deck-${deck.id}" class="deck-details"></div>
        `;
        decksContainer.appendChild(deckElement);
    });
}

function loadDeckOptions() {
    const deckSelect = document.getElementById('deckSelect');
    const decks = JSON.parse(localStorage.getItem('decks')) || [];

    deckSelect.innerHTML = '';
    decks.forEach(deck => {
        const option = document.createElement('option');
        option.value = deck.id;
        option.textContent = deck.name;
        deckSelect.appendChild(option);
    });
}

function addToSelectedDeck(cardId) {
    const deckSelect = document.getElementById('deckSelect');
    const selectedDeckId = deckSelect.value;

    if (!selectedDeckId) {
        alert('Veuillez sélectionner un deck à modifier.');
        return;
    }

    const decks = JSON.parse(localStorage.getItem('decks')) || [];
    const deck = decks.find(d => d.id === selectedDeckId);

    if (deck && deck.cards.length < 40) {
        deck.cards.push(cardId);
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDeckDetails(selectedDeckId);
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
        loadDeckOptions();
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

function renameDeckPrompt(deckId) {
    const newDeckName = prompt('Entrez le nouveau nom du deck:');
    if (newDeckName) {
        renameDeck(deckId, newDeckName);
    }
}

function renameDeck(deckId, newDeckName) {
    const decks = JSON.parse(localStorage.getItem('decks')) || [];
    const deck = decks.find(d => d.id === deckId);

    if (deck) {
        deck.name = newDeckName;
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDecks();
        loadDeckOptions();
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
    loadDeckOptions();
}

function filterCards() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const rankFilter = document.getElementById('rankFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardName = card.querySelector('img').alt.toLowerCase();
        const cardRank = card.dataset.rank;
        const cardLevel = parseInt(card.dataset.level, 10);

        const matchesSearch = cardName.includes(searchTerm);
        const matchesRank = !rankFilter || cardRank === rankFilter;
        const matchesLevel = matchesLevelRange(cardLevel, levelFilter);

        if (matchesSearch && matchesRank && matchesLevel) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function matchesLevelRange(cardLevel, levelRange) {
    if (!levelRange) return true;
    const [min, max] = levelRange.split('-').map(Number);
    return cardLevel >= min && cardLevel <= max;
}
