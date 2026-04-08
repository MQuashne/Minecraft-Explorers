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
    
    if (difficulty !== "beginner") shuffle(chestDeck);
    
    chestDeck = chestDeck.slice(0, chestCounts[difficulty]);
    
    
    return chestDeck;
}

function buildPlayers(playerNames) {
    return playerNames.map((name, index) => ({
        id: index + 1,
        name: name,
        inventory: [/*{
                id: "item_diamond_sword_02",
                visual: "item_diamond_sword_mob",
                name: "Diamond Sword",
                category: "sword",
                bonusValue: 4,
                state: "intact",
                isUsable: false,
            },
            
            // --- Pickaxes ---
            {
                id: "item_iron_pickaxe_01",
                visual: "item_iron_pickaxe",
                name: "Iron Pickaxe",
                category: "pickaxe",
                bonusValue: 2,
                state: "intact",
                isUsable: false,
            },
            {
                id: "item_iron_pickaxe_02",
                visual: "item_iron_pickaxe",
                name: "Iron Pickaxe",
                category: "pickaxe",
                bonusValue: 2,
                state: "damaged",
                isUsable: false,
            },
            {
                id: "item_emerald_03",
                visual: "item_emerald",
                name: "Emerald",
                category: "emerald",
                bonusValue: null,
                state: null,
                isUsable: false,
            },
            {
                id: "item_iron_01",
                visual: "item_iron_mob",
                name: "Iron Ingot",
                category: "iron",
                bonusValue: null,
                state: null,
                isUsable: false,
            },
            {
                id: "item_iron_02",
                visual: "item_iron",
                name: "Iron Ingot",
                category: "iron",
                bonusValue: null,
                state: null,
                isUsable: false,
            },
            {
                id: "item_crossbow_01",
                visual: "item_crossbow",
                name: "Crossbow",
                category: "crossbow",
                bonusValue: null,
                state: null,
                isUsable: true,
            },
            {
                id: "item_iron_armor_02",
                visual: "item_iron_armor",
                name: "Iron Armor",
                category: "armor",
                bonusValue: null,
                state: null,
                isUsable: false,
            },
            {
                id: "item_map_01",
                visual: "item_map",
                name: "Explorer Map",
                category: "map",
                bonusValue: null,
                state: null,
                isUsable: true,
            },
            {
                id: "item_spyglass_04",
                visual: "item_spyglass",
                name: "Spyglass",
                category: "spyglass",
                bonusValue: null,
                state: null,
                isUsable: true,
            },  {
      id: "item_glowstone_01",
      visual: "item_glowstone",
      name: "Glowstone",
      category: "lighting",
      bonusValue: null,
      state: null,
      isUsable: false,
  },
    {
      id: "item_illager_banner_01",
      visual: "item_illager_banner",
      name: "Illager Banner",
      category: "furnishing",
      bonusValue: null,
      state: null,
      isUsable: false,
  },
        */],
        trophies: [
           /* { id: "mob_zombie", name: "Zombie", cost: 2, copies: 6 },
            { id: "mob_zombie", name: "Zombie", cost: 2, copies: 6 }*/
        ]
    }));
}

export function setupGame(playerCount, playerNames, difficulty) {
    const mobDeck = buildMobDeck(playerCount);
    const mobsOnBoard = mobDeck.splice(0, 1);
    const landscapeDeck = buildLandscapeDeck();
    const landscapesOnBoard = [];
    const destinationsOnBoard = [];
    
    while (landscapesOnBoard.length < 5) {
        const [drawCard] = landscapeDeck.splice(0, 1);
        if (drawCard.isDestination) {
            destinationsOnBoard.push(drawCard);
        } else {
            landscapesOnBoard.push(drawCard);
        }
    }
    
    const gameState = {
        difficulty,
        chests: buildChestDeck(difficulty),
        mobDeck,
        mobsOnBoard,
        landscapeDeck,
        landscapesOnBoard,
        destinationsOnBoard,
        currentPlayerIndex: 0,
        hungerRemaining: 6,
        lastActionTaken: "start",
        players: buildPlayers(playerNames),
        turnEnded: false
    }
    //gameState.chests[0].placedItems.push("wood");
    //gameState.chests[2].placedItems.push("furnishing");
    /*
    gameState.landscapesOnBoard.splice(0,3);
    const testScapes = [  {
    id: "landscape_ruined_portal_01",
    subtype: "explore",
    visual: "landscape_ruined_portal",
    cost: 4,
    mobCount: 0,
    item: "item_gold_apple_01",
    tradeItem: null,
    isDestination: false,
    toolDiscount: null,
  },
  {
    id: "landscape_ruined_portal_02",
    subtype: "explore",
    visual: "landscape_ruined_portal",
    cost: 4,
    mobCount: 0,
    item: "item_gold_sword_02",
    tradeItem: null,
    isDestination: false,
    toolDiscount: null,
  },
  {
    id: "landscape_ruined_portal_03",
    subtype: "explore",
    visual: "landscape_ruined_portal",
    cost: 4,
    mobCount: 0,
    item: "item_gold_pickaxe_02",
    tradeItem: null,
    isDestination: false,
    toolDiscount: null,
  },
]
gameState.landscapesOnBoard.push(testScapes[0]);
gameState.landscapesOnBoard.push(testScapes[1]);
gameState.landscapesOnBoard.push(testScapes[2]);
console.log(gameState.landscapesOnBoard)*/
    return gameState;
}