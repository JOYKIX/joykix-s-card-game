document.addEventListener('DOMContentLoaded', () => {
    loadDeckOptions();
    document.getElementById('startBattle').addEventListener('click', startBattle);
});

function navigateTo(page) {
    window.location.href = page;
}

function loadDeckOptions() {
    const deck1Select = document.getElementById('deck1Select');
    const deck2Select = document.getElementById('deck2Select');
    const decks = JSON.parse(localStorage.getItem('decks')) || [];

    decks.forEach(deck => {
        const option1 = document.createElement('option');
        option1.value = deck.id;
        option1.textContent = deck.name;
        deck1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = deck.id;
        option2.textContent = deck.name;
        deck2Select.appendChild(option2);
    });
}

function startBattle() {
    const deck1Id = document.getElementById('deck1Select').value;
    const deck2Id = document.getElementById('deck2Select').value;

    if (!deck1Id || !deck2Id) {
        alert('Veuillez sélectionner les deux decks pour le combat.');
        return;
    }

    const decks = JSON.parse(localStorage.getItem('decks')) || [];
    const deck1 = decks.find(d => d.id === deck1Id);
    const deck2 = decks.find(d => d.id === deck2Id);

    if (!deck1 || !deck2) {
        alert('Un des decks sélectionnés est introuvable.');
        return;
    }

    const battleArena = document.getElementById('battleArena');
    const battleLog = document.getElementById('battleLog');
    battleLog.innerHTML = '';
    battleArena.innerHTML = '';

    let player1Wins = 0;
    let player2Wins = 0;

    const battles = Math.min(deck1.cards.length, deck2.cards.length);
    let currentBattle = 0;

    function nextBattle() {
        if (currentBattle < battles) {
            const card1 = getCardById(deck1.cards[currentBattle]);
            const card2 = getCardById(deck2.cards[currentBattle]);

            const result = battleCards(card1, card2);
            const logEntry = document.createElement('p');
            logEntry.textContent = `Combat ${currentBattle + 1}: ${result}`;
            battleLog.appendChild(logEntry);

            const card1Element = document.createElement('div');
            card1Element.className = 'card';
            card1Element.innerHTML = `<img src="${card1.image}" alt="${card1.name}">`;

            const card2Element = document.createElement('div');
            card2Element.className = 'card';
            card2Element.innerHTML = `<img src="${card2.image}" alt="${card2.name}">`;

            battleArena.innerHTML = '';
            battleArena.appendChild(card1Element);
            battleArena.appendChild(card2Element);

            card1Element.style.left = '10%';
            card2Element.style.right = '10%';

            setTimeout(() => {
                card1Element.classList.add('attack');
                card2Element.classList.add('hit');

                setTimeout(() => {
                    if (result.includes('Joueur 1 gagne')) {
                        player1Wins++;
                        card2Element.classList.add('hit');
                    } else if (result.includes('Joueur 2 gagne')) {
                        player2Wins++;
                        card1Element.classList.add('hit');
                    } else {
                        card1Element.classList.add('hit');
                        card2Element.classList.add('hit');
                    }

                    setTimeout(() => {
                        currentBattle++;
                        nextBattle();
                    }, 1000);
                }, 1000);
            }, 500);
        } else {
            const finalResult = document.createElement('p');
            finalResult.textContent = `Résultat final: Joueur 1 ${player1Wins} - Joueur 2 ${player2Wins}`;
            battleLog.appendChild(finalResult);
        }
    }

    nextBattle();
}

function getCardById(cardId) {
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    return savedCards.find(card => card.id === cardId);
}

function battleCards(card1, card2) {
    const stats1 = getCardStats(card1);
    const stats2 = getCardStats(card2);

    const score1 = stats1.reduce((a, b) => a + b, 0);
    const score2 = stats2.reduce((a, b) => a + b, 0);

    if (score1 > score2) {
        return `Joueur 1 gagne avec ${card1.name} contre ${card2.name}`;
    } else if (score2 > score1) {
        return `Joueur 2 gagne avec ${card2.name} contre ${card1.name}`;
    } else {
        return `Égalité entre ${card1.name} et ${card2.name}`;
    }
}

function getCardStats(card) {
    return [
        card.stats.strength,
        card.stats.dexterity,
        card.stats.constitution,
        card.stats.intelligence,
        card.stats.wisdom,
        card.stats.charisma,
        card.stats.luck,
        card.stats.speed
    ];
}
