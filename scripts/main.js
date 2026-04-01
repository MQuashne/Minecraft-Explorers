import { setupGame } from "./setup.js"
import { render } from "./render.js"
import { endTurn } from "./actions/endTurn.js"
import { refreshLandscapes } from "./actions/refreshLandscapes.js"


document.addEventListener('DOMContentLoaded', (event) =>
{
	let gameState = [];
	if (localStorage.getItem('MinecraftExplorers')) {
		
		const continueMenu = document.getElementById("continue-modal");
		continueMenu.classList.remove("hidden");
		const continueButton = document.getElementById("continue-game");
		const newButton = document.getElementById("new-game");
		continueButton.addEventListener("click", () => {
			continueGame();
		continueMenu.classList.add("hidden");
		});
		newButton.addEventListener("click", () => {
			newGame();
			continueMenu.classList.add("hidden");
		});
		
		
	} else {
		newGame();
	}
	
	
	function continueGame() {
		gameState = JSON.parse(localStorage.getItem('MinecraftExplorers'));
		const endTurnButton = document.getElementById("end-turn");
		endTurnButton.addEventListener("click", () => endTurn(gameState, render));
		render(gameState, render);
		const refreshButton = document.getElementById("refresh-landscapes");
		refreshButton.addEventListener("click", () => refreshLandscapes(gameState, render));
		render(gameState, render);
	}
	
	function newGame() {
		// --- Main Menu Unhide ---
		const menuModal = document.getElementById("menu-modal");
		menuModal.classList.remove("hidden");
		
		
		// ---Get difficulty dropdown---
		const difficultySelect = document.getElementById("difficulty-select");
		
		
		// ---Get Number of Players and unhide name boxes ---
		const playerCount = document.getElementById("player-count");
		const nameBoxes = document.querySelectorAll('.player-name-group');
		let numPlayers = 1;
		playerCount.addEventListener("change", (event) => {
			numPlayers = playerCount.selectedIndex + 1;
			nameBoxes.forEach((nameGroup, index) => {
				if (index <= numPlayers - 1) {
					nameGroup.classList.remove('hidden');
				} else {
					nameGroup.classList.add('hidden');
				}
				
			});
		});
		const startButton = document.getElementById("start-button");
		let playerNames = [];
		startButton.addEventListener('click', (event) => {
			const visibleInputs = document.querySelectorAll('.player-name-group:not(.hidden) .player-name-input');
			visibleInputs.forEach(name => {
				playerNames.push(name.value.trim() || `Player ${playerNames.length + 1}`);
			});
			gameState = setupGame(numPlayers, playerNames, difficultySelect.value);
			menuModal.classList.add("hidden");
			
			const endTurnButton = document.getElementById("end-turn");
			endTurnButton.addEventListener("click", () => endTurn(gameState, render));
			render(gameState, render);
			const refreshButton = document.getElementById("refresh-landscapes");
			refreshButton.addEventListener("click", () => refreshLandscapes(gameState, render));
			render(gameState, render);
			
		});
	}
});