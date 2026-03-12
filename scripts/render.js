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
	const row = document.getElementById(‘chest - row’);
	row.innerHTML = ‘’;


	gameState.chests.forEach(chest => {
		const card = document.createElement('div');
		card.classList.add('card', 'portrait-card', 'chest-card');
		const cardImage = document.createElement('img');

		// Chest is fully filled — show closed chest
		if (chest.placedItems.length === chest.fillItems.length) {
			cardImage.src = `images/chests/chest_filled.png`;
		} else {
			// Chest is empty or partially filled — show open chest card
			cardImage.src = `images/chests/${chest.id}.png`;

			// Partially filled — add indicator to correct slot
			if (chest.placedItems.length === 1) {
				const filledSlot = document.createElement('div');
				if (chest.placedItems[0] === chest.fillItems[0]) {
					filledSlot.classList.add('chest-slot', 'chest-slot-1', 'filled');
				} else {
					filledSlot.classList.add('chest-slot', 'chest-slot-2', 'filled');
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
	const row = document.getElementById(‘mob - row’);
	row.innerHTML = ‘’;


	// --- Deck card (left side) ---
	const deckCard = document.createElement('div');
	deckCard.classList.add('card', 'portrait-card', 'mob-deck-card');

	// Pulse red when 4 or fewer cards remain (Game Over is near)
	if (gameState.mobDeck.length <= 4) {
		deckCard.classList.add('danger');
	}

	const deckCardImage = document.createElement('img');
	deckCardImage.src = 'images/mobs/mob_back.png';
	deckCard.appendChild(deckCardImage);

	const deckCount = document.createElement('div');
	deckCount.classList.add('card-label');
	deckCount.textContent = `${gameState.mobDeck.length}`;
	deckCard.appendChild(deckCount);

	row.appendChild(deckCard);

	// --- Revealed mobs ---
	gameState.mobsOnBoard.forEach(mob => {
		const card = document.createElement('div');
		card.classList.add('card', 'portrait-card', 'mob-card');
		const cardImage = document.createElement('img');
		cardImage.src = `images/mobs/${mob.id}.png`;
		card.appendChild(cardImage);
		row.appendChild(card);
	});
}

// =============================================================================
// LANDSCAPE ROW
function renderLandscapeRow(gameState) {
	const row = document.getElementById(‘landscape - row’);
	row.innerHTML = ‘’;


	// --- Deck card (left side) ---
	const deckCard = document.createElement('div');
	deckCard.classList.add('card', 'portrait-card', 'mob-deck-card');

	// Pulse red when 4 or fewer cards remain (Game Over is near)
	if (gameState.mobDeck.length <= 4) {
		deckCard.classList.add('danger');
	}

	const deckCardImage = document.createElement('img');
	deckCardImage.src = 'images/mobs/mob_back.png';
	deckCard.appendChild(deckCardImage);

	const deckCount = document.createElement('div');
	deckCount.classList.add('card-label');
	deckCount.textContent = `${gameState.mobDeck.length}`;
	deckCard.appendChild(deckCount);

	row.appendChild(deckCard);

	// --- Revealed mobs ---
	gameState.mobsOnBoard.forEach(mob => {
		const card = document.createElement('div');
		card.classList.add('card', 'portrait-card', 'mob-card');
		const cardImage = document.createElement('img');
		cardImage.src = `images/mobs/${mob.id}.png`;
		card.appendChild(cardImage);
		row.appendChild(card);
	});
}

// =============================================================================

// Coming soon

// =============================================================================
// INVENTORY ROW
// =============================================================================

// Coming soon

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