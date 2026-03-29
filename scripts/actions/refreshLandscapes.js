export function refreshLandscapes(gameState, renderCallback) {
  
  const landscapeZone = document.getElementById("landscape-zone");
  const destinationZone = document.getElementById("landscape-destination-zone");
  const landscapeDeck = gameState.landscapeDeck;
  const boardButtons = document.querySelectorAll('.board-button');
  const boardCover = document.getElementById("board-cover");
  boardCover.innerHTML = '';
  boardCover.classList.remove("hidden");
  landscapeZone.style.zIndex = "4";
  landscapeZone.dataset.actionMode = "refresh";
  const doneButton = document.createElement("button");
  doneButton.classList.add("tap-control", "button");
  let rect = landscapeZone.getBoundingClientRect();
  doneButton.textContent = "Refill Empty & Refresh Selected (1🍖)";
  let landscapeFound = false;
  
  if (gameState.hungerRemaining >= 1) {
    doneButton.addEventListener("click", () => {
      const selectedIndices = [...landscapeZone.querySelectorAll("[data-selected-for-refresh]")]
        .map(el => parseInt(el.dataset.selectedForRefresh))
        .sort((a, b) => b - a);
      selectedIndices.forEach((index) => {
        landscapeFound = false;
        while (!landscapeFound) {
          const [addedLandscape] = landscapeDeck.splice(0, 1);
          if (addedLandscape.isDestination) {
            gameState.destinationsOnBoard.push(addedLandscape);
          } else {
            gameState.landscapesOnBoard.splice(index, 1, addedLandscape);
            landscapeFound = true;
          }
        }
      });
      for (let i = 0; i < 5; i++) {
        if (gameState.landscapesOnBoard[i].id === "empty") {
          landscapeFound = false;
          while (landscapeFound === false) {
            const [filledLandscape] = landscapeDeck.splice(0, 1);
            if (filledLandscape.isDestination) {
              gameState.destinationsOnBoard.push(filledLandscape);
            } else {
              gameState.landscapesOnBoard.splice(i, 1, filledLandscape);
              landscapeFound = true;
            }
          }
        };
      }
      if (selectedIndices.length > 0) {
        gameState.hungerRemaining--;
      }
      boardCover.classList.add("hidden");
      landscapeZone.style.removeProperty("z-index");
      renderCallback(gameState, renderCallback);
    })
  } else {
    doneButton.classList.add("disabled");
    doneButton.disabled = true;
  }
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Back to Board";
  backButton.addEventListener("click", () => {
    boardCover.classList.add("hidden");
    landscapeZone.style.removeProperty("z-index");
    renderCallback(gameState, renderCallback);
  })
  
  boardCover.appendChild(doneButton);
  boardCover.appendChild(backButton);
}