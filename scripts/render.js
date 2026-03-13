// =============================================================================
// Minecraft Explorers - Render Functions
// =============================================================================
// These functions read game state and update the DOM.
// Pattern: clear the container, rebuild from current state.
// =============================================================================

// =============================================================================
// CHEST ROW
// =============================================================================

function renderChestRow(gameState) {
	const row = document.getElementById("chest - row");
	row.innerHTML = "";

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

		card.appendChild(cardImage);
		row.appendChild(card);
	});
}

// =============================================================================
// MOB ROW
// =============================================================================

function renderMobRow(gameState) {
	const row = document.getElementById("mob - row");
	row.innerHTML = "";

	// --- Deck card (left side) ---
	const deckCard = document.createElement("div");
	deckCard.classList.add("card", "portrait-card", "mob-deck-card");

	// Pulse red when 4 or fewer cards remain (Game Over is near)
	if (gameState.mobDeck.length <= 4) {
		deckCard.classList.add("danger");
	}

	const deckCardImage = document.createElement("img");
	deckCardImage.src = "images/mobs/mob_back.jpg";
	deckCard.appendChild(deckCardImage);

	const deckCount = document.createElement("div");
	deckCount.classList.add("card-label");
	deckCount.textContent = `${gameState.mobDeck.length}`;
	deckCard.appendChild(deckCount);

	row.appendChild(deckCard);

	// --- Revealed mobs ---
	gameState.mobsOnBoard.forEach((mob) => {
		const card = document.createElement("div");
		card.classList.add("card", "portrait-card", "mob-card");
		const cardImage = document.createElement("img");
		cardImage.src = `images/mobs/${mob.id}.jpg`;
		card.appendChild(cardImage);
		row.appendChild(card);
	});
}

// =============================================================================
// LANDSCAPE ROW
function renderLandscapeRow(gameState) {
	const deckZone = document.querySelector("#landscape-deck-zone");
	const landscapeZone = document.querySelector("#landscape-zone");
	const destinationZone = document.querySelector("#landscape-destination-zone");
	deckZone.innerHTML = '<span class="zone-label">Landscape Deck</span>';

	// --- Deck card (left side) ---
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

	for (let i = 0; i < 5; i++) {
		const landscape = gameState.landscapesOnBoard[i];
		if (landscape) {
			const landscapeCard = document.createElement("img");
			landscapeCard.src = `images/landscapes/${landscape.visual}.jpg`;
			landscapeCard.classList.add("card", "landscape-card");
			landscapeZone.appendChild(landscapeCard);
		} else {
			const emptyLandscape = document.createElement("div");
			emptyLandscape.classList.add(
				"card",
				"landscape-card",
				"placeholder-card",
			);
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
			destinationZone.appendChild(destinationCard);
		});
	} else {
		destinationZone.classList.add("hidden");
	}
}

// =============================================================================

// Coming soon

// =============================================================================
// INVENTORY ROW
// =============================================================================

function renderInventoryRow(gameState, playerIndex) {
	const playerInventory = gameState.players[playerIndex].inventory;
	const playerTrophies = gameState.players[playerIndex].trophies;
	const inventoryZone = document.querySelector("#inventory-zone");
	const trophiesZone = document.querySelector("#trophies-zone");

	//  --- Inventory Zone ---
	inventoryZone.innerHTML = '<span class="zone-label">Inventory</span>';
	if (playerInventory.length > 0) {
		playerInventory.sort((a, b) => {
			return a.category.localeCompare(b.category) || a.id.localeCompare(b.id);
		});
		playerInventory.forEach((object) => {
			const objectCard = document.createElement("img");
			objectCard.src = `images/items/${object.visual}.jpg`;
			objectCard.alt = object.id;
			objectCard.classList.add("card", "portrait-card");
			if (objectCard.state === "damaged") {
				objectCard.classList.add(rotate - card);
			}
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
			trophyZone.appendChild(trophyCard);
			
		});

	}	
	
// =============================================================================
// INFO BAR
// =============================================================================

// Coming soon

// =============================================================================
// MASTER RENDER
// =============================================================================
// Call this whenever game state changes to refresh the entire board.

export function render(gameState) {
	renderChestRow(gameState);
	renderMobRow(gameState);
}