import { setupGame } from "./setup.js"

document.addEventListener('DOMContentLoaded', (event) => {

	// --- Main Menu Unhide ---
	const menuModal = document.getElementById("menu-modal");
	menuModal.classList.remove("hidden");

	// ---Get Difficulty ---
	const difficultySlider = document.getElementById("difficulty-slider");
	const difficultySelection = document.getElementById("difficulty-selection");
	let difficulty = "beginner";
	difficultySlider.addEventListener('input', (event) => {

		const difficulties = ["beginner", "easy", "normal", "hard", "hardcore"];
		difficulty = difficulties[difficultySlider.value - 1];
		difficultySelection.textContent = difficulty.toUpperCase();
	});

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
			if (name.value) {
				playerNames.push(name.value);
			}
			playerNames.push(name.value.trim() || `Player ${playerNames.length + 1}`);
		});
		setupGame(numPlayers, playerNames, difficulty);
		menuModal.classList.add("hidden");

	});




});