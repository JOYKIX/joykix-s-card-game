document.getElementById('generate').addEventListener('click', generateCard);
document.getElementById('download').addEventListener('click', downloadCard);
document.getElementById('export').addEventListener('click', exportCard);

function updateCounts() {
    document.getElementById('nameCount').textContent = `🔤 Noms: ${names.length}`;
    document.getElementById('classCount').textContent = `🛡️ Classes: ${classes.length}`;
    document.getElementById('raceCount').textContent = `🌍 Races: ${races.length}`;
    document.getElementById('abilityCount').textContent = `✨ Compétences: ${abilities.length}`;
    document.getElementById('weaponCount').textContent = `⚔️ Armes: ${weapons.length}`;
    document.getElementById('armorCount').textContent = `🛡️ Armures: ${armors.length}`;
    document.getElementById('backgroundCount').textContent = `📜 Origines: ${backgrounds.length}`;
    document.getElementById('descriptionCount').textContent = `📝 Descriptions: ${descriptions.length}`;
    
    const totalPossibilitiesRandom = calculateTotalPossibilities(names.length);
    const totalPossibilitiesCustom = calculateTotalPossibilities(1);

    document.getElementById('totalPossibilitiesRandom').textContent = `🔄 Total de possibilités avec nom aléatoire: ${totalPossibilitiesRandom.toLocaleString()}`;
    document.getElementById('totalPossibilitiesCustom').textContent = `✍️ Total de possibilités avec nom personnalisé: ${totalPossibilitiesCustom.toLocaleString()}`;
}

function calculateTotalPossibilities(numNames) {
    const numClasses = classes.length;
    const numRaces = races.length;
    const numAbilities = abilities.length;
    const numWeapons = weapons.length;
    const numArmors = armors.length;
    const numBackgrounds = backgrounds.length;
    const numDescriptions = descriptions.length;
    const numLevels = 100;
    const numStats = 100;
    const numStatsTotal = Math.pow(numStats, 8); // Chaque statistique a une plage de 1 à 100, et il y a 8 statistiques

    return numNames * numClasses * numRaces * numAbilities * numWeapons * numArmors * numBackgrounds * numDescriptions;
}

function generateCard() {
    const inputName = document.getElementById('inputName').value;
    const name = inputName ? inputName : names[Math.floor(Math.random() * names.length)];
    const selectedRank = document.getElementById('rankSelect').value;

    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomAbility = abilities[Math.floor(Math.random() * abilities.length)];
    const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    const randomArmor = armors[Math.floor(Math.random() * armors.length)];
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const stats = generateStats(selectedRank);
    const averageStat = getAverageStat(stats);
    const level = Math.floor(averageStat);
    const rank = selectedRank ? selectedRank : getRank(averageStat);

    document.getElementById('name').textContent = name;
    document.getElementById('rank').textContent = rank;
    document.getElementById('class').textContent = `Classe: ${randomClass}`;
    document.getElementById('race').textContent = `Race: ${randomRace}`;
    document.getElementById('level').textContent = `Niveau: ${level}`;
    document.getElementById('strength').textContent = `💪 Force: ${stats.strength}`;
    document.getElementById('dexterity').textContent = `🤸‍♂️ Dextérité: ${stats.dexterity}`;
    document.getElementById('constitution').textContent = `🏋️‍♂️ Constitution: ${stats.constitution}`;
    document.getElementById('intelligence').textContent = `🧠 Intelligence: ${stats.intelligence}`;
    document.getElementById('wisdom').textContent = `🦉 Sagesse: ${stats.wisdom}`;
    document.getElementById('charisma').textContent = `💃 Charisme: ${stats.charisma}`;
    document.getElementById('luck').textContent = `🍀 Chance: ${stats.luck}`;
    document.getElementById('speed').textContent = `⚡ Vitesse: ${stats.speed}`;
    document.getElementById('abilities').textContent = `Compétences: ${randomAbility}`;
    document.getElementById('weapon').textContent = `Arme: ${randomWeapon}`;
    document.getElementById('armor').textContent = `Armure: ${randomArmor}`;
    document.getElementById('background').textContent = `Origine: ${randomBackground}`;
    document.getElementById('description').textContent = `Description: ${randomDescription}`;

    const customRankMention = selectedRank ? `Rang spécifié: ${selectedRank}` : '';
    document.getElementById('customRankMention').textContent = customRankMention;

    // Supprime toutes les classes de rang existantes
    const card = document.getElementById('card');
    card.classList.remove('rank-D', 'rank-C', 'rank-B', 'rank-A', 'rank-S', 'rank-Ultimate');
    // Ajoute la classe de rang actuelle
    card.classList.add(`rank-${rank}`);
}

function generateStats(rank) {
    const statRanges = {
        'D': [1, 50],
        'C': [50, 60],
        'B': [60, 70],
        'A': [70, 80],
        'S': [80, 90],
        'Ultimate': [90, 100]
    };

    if (rank && statRanges[rank]) {
        const [min, max] = statRanges[rank];
        return {
            strength: getRandomStatInRange(min, max),
            dexterity: getRandomStatInRange(min, max),
            constitution: getRandomStatInRange(min, max),
            intelligence: getRandomStatInRange(min, max),
            wisdom: getRandomStatInRange(min, max),
            charisma: getRandomStatInRange(min, max),
            luck: getRandomStatInRange(min, max),
            speed: getRandomStatInRange(min, max)
        };
    } else {
        return {
            strength: getRandomStat(),
            dexterity: getRandomStat(),
            constitution: getRandomStat(),
            intelligence: getRandomStat(),
            wisdom: getRandomStat(),
            charisma: getRandomStat(),
            luck: getRandomStat(),
            speed: getRandomStat()
        };
    }
}

function getRandomStat() {
    return Math.floor(Math.random() * 100) + 1;
}

function getRandomStatInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAverageStat(stats) {
    const total = stats.strength + stats.dexterity + stats.constitution + stats.intelligence + stats.wisdom + stats.charisma + stats.luck + stats.speed;
    return total / 8;
}

function getRank(averageStat) {
    if (averageStat >= 90) return 'Ultimate';
    if (averageStat >= 80) return 'S';
    if (averageStat >= 70) return 'A';
    if (averageStat >= 60) return 'B';
    if (averageStat >= 50) return 'C';
    return 'D';
}

function downloadCard() {
    html2canvas(document.querySelector("#card")).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'carte_rpg.png';
        link.click();
    });
}

function exportCard() {
    const cardData = {
        name: document.getElementById('name').textContent,
        rank: document.getElementById('rank').textContent,
        class: document.getElementById('class').textContent.split(": ")[1],
        race: document.getElementById('race').textContent.split(": ")[1],
        level: document.getElementById('level').textContent.split(": ")[1],
        stats: {
            strength: document.getElementById('strength').textContent.split(": ")[1],
            dexterity: document.getElementById('dexterity').textContent.split(": ")[1],
            constitution: document.getElementById('constitution').textContent.split(": ")[1],
            intelligence: document.getElementById('intelligence').textContent.split(": ")[1],
            wisdom: document.getElementById('wisdom').textContent.split(": ")[1],
            charisma: document.getElementById('charisma').textContent.split(": ")[1],
            luck: document.getElementById('luck').textContent.split(": ")[1],
            speed: document.getElementById('speed').textContent.split(": ")[1]
        },
        abilities: document.getElementById('abilities').textContent.split(": ")[1],
        weapon: document.getElementById('weapon').textContent.split(": ")[1],
        armor: document.getElementById('armor').textContent.split(": ")[1],
        background: document.getElementById('background').textContent.split(": ")[1],
        description: document.getElementById('description').textContent.split(": ")[1],
        customRankMention: document.getElementById('customRankMention').textContent
    };

    const json = JSON.stringify(cardData, null, 2);
    const blob = new Blob([json], {type: "application/json"});
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carte_rpg.json';
    link.click();
}

// Animation de la carte
const card = document.getElementById('card');
card.addEventListener('mousemove', handleMouseMove);
card.addEventListener('mouseleave', handleMouseLeave);

function handleMouseMove(event) {
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const rotateX = (mouseY - centerY) / cardHeight * 30; // Inversé pour incliner correctement
    const rotateY = (mouseX - centerX) / cardWidth * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function handleMouseLeave() {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

function saveCard() {
    html2canvas(document.querySelector("#card")).then(canvas => {
        const cardData = {
            id: Date.now().toString(),
            name: document.getElementById('name').textContent,
            rank: document.getElementById('rank').textContent,
            class: document.getElementById('class').textContent.split(": ")[1],
            race: document.getElementById('race').textContent.split(": ")[1],
            level: document.getElementById('level').textContent.split(": ")[1],
            stats: {
                strength: document.getElementById('strength').textContent.split(": ")[1],
                dexterity: document.getElementById('dexterity').textContent.split(": ")[1],
                constitution: document.getElementById('constitution').textContent.split(": ")[1],
                intelligence: document.getElementById('intelligence').textContent.split(": ")[1],
                wisdom: document.getElementById('wisdom').textContent.split(": ")[1],
                charisma: document.getElementById('charisma').textContent.split(": ")[1],
                luck: document.getElementById('luck').textContent.split(": ")[1],
                speed: document.getElementById('speed').textContent.split(": ")[1]
            },
            abilities: document.getElementById('abilities').textContent.split(": ")[1],
            weapon: document.getElementById('weapon').textContent.split(": ")[1],
            armor: document.getElementById('armor').textContent.split(": ")[1],
            background: document.getElementById('background').textContent.split(": ")[1],
            description: document.getElementById('description').textContent.split(": ")[1],
            customRankMention: document.getElementById('customRankMention').textContent,
            image: canvas.toDataURL('image/png')
        };

        let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
        savedCards.push(cardData);
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
        alert('Carte sauvegardée dans la galerie !');
    });
}

function navigateTo(page) {
    window.location.href = page;
}


updateCounts();
