const CARDS_PER_PAGE = 12;
const DECKS_PER_PAGE = 6;
let currentCardPage = 1;
let currentDeckPage = 1;

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
    const filteredCards = filterCardsArray(savedCards);

    const start = (currentCardPage - 1) * CARDS_PER_PAGE;
    const end = start + CARDS_PER_PAGE;
    const paginatedCards = filteredCards.slice(start, end);

    savedCardsContainer.innerHTML = '';
    paginatedCards.forEach(card => {
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

    setupCardPagination(filteredCards.length);
}

function setupCardPagination(totalCards) {
    const paginationContainer = document.getElementById('card-pagination');
    const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentCardPage ? 'active' : '';
        button.addEventListener('click', () => {
            currentCardPage = i;
            loadSavedCards();
        });
        paginationContainer.appendChild(button);
    }
}

function loadDecks() {
    const decksContainer = document.getElementById('decks');
    const decks = JSON.parse(localStorage.getItem('decks')) || [];

    const start = (currentDeckPage - 1) * DECKS_PER_PAGE;
    const end = start + DECKS_PER_PAGE;
    const paginatedDecks = decks.slice(start, end);

    decksContainer.innerHTML = '';
    paginatedDecks.forEach(deck => {
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

    setupDeckPagination(decks.length);
}

function setupDeckPagination(totalDecks) {
    const paginationContainer = document.getElementById('deck-pagination');
    const totalPages = Math.ceil(totalDecks / DECKS_PER_PAGE);

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentDeckPage ? 'active' : '';
        button.addEventListener('click', () => {
            currentDeckPage = i;
            loadDecks();
        });
        paginationContainer.appendChild(button);
    }
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
    currentCardPage = 1; // Reset to the first page when filtering
    loadSavedCards();
}

function filterCardsArray(cards) {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const rankFilter = document.getElementById('rankFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;

    return cards.filter(card => {
        const cardName = card.name.toLowerCase();
        const cardRank = card.rank;
        const cardLevel = parseInt(card.level, 10);

        const matchesSearch = cardName.includes(searchTerm);
        const matchesRank = !rankFilter || cardRank === rankFilter;
        const matchesLevel = matchesLevelRange(cardLevel, levelFilter);

        return matchesSearch && matchesRank && matchesLevel;
    });
}

function matchesLevelRange(cardLevel, levelRange) {
    if (!levelRange) return true;
    const [min, max] = levelRange.split('-').map(Number);
    return cardLevel >= min && cardLevel <= max;
}
