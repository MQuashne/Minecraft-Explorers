// =============================================================================
// Minecraft Explorers - Render Functions
// =============================================================================
// These functions read game state and update the DOM.
// Pattern: clear the container, rebuild from current state.
// =============================================================================
import { exploreLandscape } from "./actions/explore.js"
import { fightMobs } from "./actions/fightMobs.js"
import { viewItem } from "./actions/useItem.js"
import { useTrophies } from "./actions/useTrophies.js"
import { viewChest } from "./actions/fillChests.js"
// =============================================================================
// CHEST ROW
// =============================================================================

function renderChestRow(gameState, renderCallback) {
	const row = document.getElementById("chests-zone");
	row.innerHTML = '<span class="zone-label">Chests</span>';
	
	gameState.chests.forEach((chest) => {
		const card = document.createElement("div");
		card.classList.add("card", "portrait-card", "chest-card");
		const cardImage = document.createElement("img");
		
		// Chest is fully filled — show closed chest
		if (chest.placedItems.length === chest.fillItems.length) {
			cardImage.src = `images/chests/chest_filled.jpg`;
		} else {
			// Chest is empty or partially filled — show open chest card
			cardImage.src = `images/chests/${chest.id}.jpg`;
			
			// Partially filled — add indicator to correct slot
			if (chest.placedItems.length === 1) {
				const filledSlot = document.createElement("div");
				if (chest.placedItems[0] === chest.fillItems[0]) {
					filledSlot.classList.add("chest-slot", "chest-slot-1", "filled");
				} else {
					filledSlot.classList.add("chest-slot", "chest-slot-2", "filled");
				}
				card.appendChild(filledSlot);
			}
		}
		card.addEventListener("click", () => {
			console.log("found")
	viewChest(gameState, chest, renderCallback);
});
		card.appendChild(cardImage);
		row.appendChild(card);
	});
}

// =============================================================================
// MOB ROW
// =============================================================================

function renderMobRow(gameState, renderCallback) {
	const mobRow = document.getElementById("mobs-zone");
	mobRow.innerHTML = '<span class="zone-label">Mobs</span>';
	
	const mobDeckRow = document.getElementById("mob-deck-zone");
	mobDeckRow.innerHTML = '<span class="zone-label">Mob Deck</span>';
	
	// --- Deck card (left side) ---
	const deckCard = document.createElement("div");
	deckCard.classList.add("card", "portrait-card", "mob-deck-card");
	/*
		// Pulse red when 4 or fewer cards remain (Game Over is near)
		if (gameState.mobDeck.length <= 4) {
			deckCard.classList.add("danger");
		}

	*/
	const deckCardImage = document.createElement("img");
	deckCardImage.src = "images/mobs/mob_back.jpg";
	deckCard.appendChild(deckCardImage);
	/*
		const deckCount = document.createElement("div");
		deckCount.classList.add("card-label");
		deckCount.textContent = `${gameState.mobDeck.length}`;
		deckCard.appendChild(deckCount);
	*/
	mobDeckRow.appendChild(deckCard);
	
	// --- Revealed mobs ---
	
	if (gameState.mobsOnBoard.length > 0) {
		gameState.mobsOnBoard.sort((a, b) => {
			return a.id.localeCompare(b.id);
		});
	}
	gameState.mobsOnBoard.forEach((mob,index) => {
		const card = document.createElement("div");
		card.classList.add("card", "portrait-card");
		card.style.position = "relative";
		const cardImage = document.createElement("img");
		cardImage.src = `images/mobs/${mob.id}.jpg`;
		const tint = document.createElement("div");
		tint.classList.add("selection-tint");
		tint.style.display = "none";
		
		card.appendChild(cardImage);
		card.appendChild(tint);
		console.log("rendered");
		mobRow.dataset.actionMode = "fight";
		card.addEventListener('click', () => {
			console.log("mobclick:" + mobRow.dataset.actionMode);
			if (mobRow.dataset.actionMode === "fight") {
				fightMobs(gameState, renderCallback, mob)
			} else if (mobRow.dataset.actionMode === "crossbow") {
				const selectedIndices = [...mobRow.querySelectorAll("[data-selected-for-kill]")];
				if (card.dataset.selectedForKill) {
					delete card.dataset.selectedForKill;
					tint.style.display = "none"
				} else if (selectedIndices.length<2){
					card.dataset.selectedForKill= index;
					tint.style.display = "block";
				}
			}});
			mobRow.appendChild(card);
	});
}

// =============================================================================
// LANDSCAPE ROW
function renderLandscapeRow(gameState, renderCallback) {
	const deckZone = document.querySelector("#landscape-deck-zone");
	const landscapeZone = document.querySelector("#landscape-zone");
	const destinationZone = document.querySelector("#landscape-destination-zone");
	deckZone.innerHTML = '<span class="zone-label">Landscape Deck</span>';
	
	// --- Deck card (right side) ---
	if (gameState.landscapeDeck.length > 0) {
		const topCard = gameState.landscapeDeck[0];
		const img = document.createElement("img");
		img.src = `images/landscapes/${topCard.visual}.jpg`;
		img.alt = topCard.id;
		img.classList.add("card", "landscape-card");
		deckZone.appendChild(img);
	} else {
		const empty = document.createElement("div");
		empty.classList.add("card", "landscape-card", "placeholder-card");
		deckZone.appendChild(empty);
	}
	
	// --- Landscape zone (always 5 slots) ---
	landscapeZone.innerHTML = '<span class="zone-label">Landscapes</span>';
	landscapeZone.dataset.actionMode = "explore";
	for (let i = 0; i < 5; i++) {
		const landscape = gameState.landscapesOnBoard[i];
		if (landscape.id != "empty") {
			
			
			const landscapeCard = document.createElement("div");
			landscapeCard.id = landscape.id;
			landscapeCard.classList.add("card", "landscape-card");
			landscapeCard.style.position = "relative";
			const landscapeImage = document.createElement("img");
			landscapeImage.src = `images/landscapes/${landscape.visual}.jpg`;
			const tint = document.createElement("div");
			tint.classList.add("selection-tint");
			tint.style.display = "none";
			landscapeCard.appendChild(landscapeImage);
			landscapeCard.appendChild(tint);
			
			
			
			landscapeCard.addEventListener('click', () => {
				if (landscapeZone.dataset.actionMode === "explore") {
					exploreLandscape(gameState, renderCallback, landscape)
				} else if (landscapeZone.dataset.actionMode === "refresh") {
					if (landscapeCard.dataset.selectedForRefresh) {
						delete landscapeCard.dataset.selectedForRefresh;
						tint.style.display = "none"
					} else {
						landscapeCard.dataset.selectedForRefresh = i;
						tint.style.display = "block";
					}
				}
			});
			landscapeZone.appendChild(landscapeCard);
		} else {
			const emptyLandscape = document.createElement("div");
			emptyLandscape.classList.add(
				"card",
				"landscape-card",
				"placeholder-card"
			);
			emptyLandscape.setAttribute("refresh", '');
			landscapeZone.appendChild(emptyLandscape);
		}
	}
	
	// --- Destination zone (up to 2 slots) ---
	
	destinationZone.innerHTML = '<span class="zone-label">Destinations</span>';
	if (gameState.destinationsOnBoard.length > 0) {
		gameState.destinationsOnBoard.forEach((destination) => {
			destinationZone.classList.remove("hidden");
			const destinationCard = document.createElement("img");
			destinationCard.src = `images/landscapes/${destination.visual}.jpg`;
			destinationCard.classList.add("card", "landscape-card");
			destinationCard.addEventListener('click', () => exploreLandscape(gameState, renderCallback, destination));
			destinationZone.appendChild(destinationCard);
		});
	} else {
		destinationZone.classList.add("hidden");
	}
}


// =============================================================================
// INVENTORY ROW

function renderInventoryRow(gameState, renderCallback, playerIndex = 0) {
	//keep only while single screen
	playerIndex = gameState.currentPlayerIndex
	
	const playerInventory = gameState.players[playerIndex].inventory;
	const playerTrophies = gameState.players[playerIndex].trophies;
	const inventoryZone = document.querySelector("#inventory-zone");
	const trophiesZone = document.querySelector("#trophies-zone");
	
	//  --- Inventory Zone ---
	inventoryZone.innerHTML = '<span class="zone-label">Inventory</span>';
	if (playerInventory.length > 0) {
		playerInventory.sort((a, b) => {
			return a.category.localeCompare(b.category) || a.id.localeCompare(b.id);
			index = playerInventory.indexOf(tool);
			playerInventory.splice(index, 1);
		});
		playerInventory.forEach((object) => {
			const objectCard = document.createElement("img");
			objectCard.src = `images/items/${object.visual}.jpg`;
			objectCard.alt = object.id;
			objectCard.classList.add("card", "portrait-card");
			if (object.state === "damaged") {
				objectCard.classList.add("rotate-card");
			}
			objectCard.addEventListener("click", () => {
				viewItem(gameState, object, renderCallback);
			});
			inventoryZone.appendChild(objectCard);
			
		});
		
	}
	
	// --- Trophy Zone ---
	trophiesZone.innerHTML = '<span class="zone-label">Trophies</span>';
	if (playerTrophies.length > 0) {
		playerTrophies.sort((a, b) => {
			return a.id.localeCompare(b.id);
		});
		playerTrophies.forEach((trophy) => {
			const trophyCard = document.createElement("img");
			trophyCard.src = `images/mobs/${trophy.id}.jpg`;
			trophyCard.alt = trophy.id;
			trophyCard.classList.add("card", "portrait-card");
			trophyCard.addEventListener("click", () => {
				useTrophies(gameState, trophy, renderCallback);
			});
			trophiesZone.appendChild(trophyCard);
			
		});
		
	}
}
// =============================================================================
// INFO BAR

function renderInfoBar(gameState, renderCallback) {
	document.querySelector(".info-player").textContent = gameState.players[gameState.currentPlayerIndex].name;
	document.querySelector(".info-hunger").textContent = `🍖 ${gameState.hungerRemaining}`;
	document.querySelector(".info-deck").textContent = `⚔️ ${gameState.mobDeck.length}`;
}

// =============================================================================
//
// =============================================================================
// MASTER RENDER
// =============================================================================
// Call this whenever game state changes to refresh the entire board.

export function render(gameState, renderCallback) {
	renderChestRow(gameState, renderCallback);
	renderMobRow(gameState, renderCallback);
	renderLandscapeRow(gameState, renderCallback);
	renderInventoryRow(gameState, renderCallback);
	renderInfoBar(gameState, renderCallback);
}