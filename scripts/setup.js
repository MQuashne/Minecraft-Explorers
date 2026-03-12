import { Mobs, Landscapes, Chests } from "./cardData.js"

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function buildMobDeck(playerCount) {
    let mobDeck = [];
    for (let mob of Mobs) {
        for (let i = 0; i < mob.copies; i++) {
            mobDeck.push({ ...mob });
        }
    }
    shuffle(mobDeck);
    mobDeck.splice(0, 9 - playerCount);
    const gameOverCard = { id: "mob_game_over", name: "Game Over", cost: null, copies: 1 };
    let gameOverPosition = Math.floor(Math.random() * 5) + mobDeck.length - 4;
    mobDeck.splice(gameOverPosition, 0, gameOverCard);
    return mobDeck;
}

function buildLandscapeDeck() {
    return shuffle([...Landscapes]);
}

function buildChestDeck(difficulty) {
    let chestDeck = Chests.map(chest => ({ ...chest, placedItems: [] }));
    const chestCounts = { beginner: 5, easy: 5, normal: 6, hard: 7, hardcore: 8 };
    
    if (!chestCounts[difficulty]) {
        console.error(`Invalid difficulty: ${difficulty}`);
        return [];
    }

    if (difficulty !== "beginner") shuffle​​​​​​​​​​​​​​​​
