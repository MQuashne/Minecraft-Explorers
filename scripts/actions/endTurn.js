import { revealMobs, animateMobReveal } from "./revealMobs.js"

export function endTurn(gameState, renderCallback) {
  
  
  const actionModal = document.getElementById("action-modal");
  
  const modalCardInfo = document.getElementById("modal-card-info");
  modalCardInfo.innerHTML = '';
  
  const actionButtons = document.getElementById("modal-action-buttons");
  actionButtons.innerHTML = '';
  
  const endOverlay = document.getElementById("end-turn-overlay");
  
  const playerInventory = gameState.players[gameState.currentPlayerIndex].inventory;
  const playerArmor = playerInventory.filter(item => item.category === "armor");
  
  const endConfirm = document.createElement("div");
  
  endConfirm.textContent = "End your turn and go to sleep?";
  endConfirm.classList.add("option-label");
  const nightCard = document.createElement("img");
  nightCard.classList.add("modal-portrait");
  nightCard.src = "./images/card_night.jpg";
  
  modalCardInfo.appendChild(endConfirm);
  modalCardInfo.appendChild(nightCard);
  
  const confirmButton = document.createElement("button");
  confirmButton.classList.add("tap-control", "button");
  confirmButton.textContent = "Yes - Reveal Mobs";
  actionButtons.appendChild(confirmButton);
  
  if (playerArmor.length > 0) {
    const armorButton = document.createElement("button");
    armorButton.classList.add("tap-control", "button");
    armorButton.textContent = "Use Armor";
    actionButtons.appendChild(armorButton);
    armorButton.addEventListener("click", () => {
      let armorIndex = playerInventory.indexOf(playerArmor[0]);
      playerInventory.splice(armorIndex, 1);
      actionModal.classList.add("hidden");
      if (gameState.currentPlayerIndex === gameState.players.length - 1) {
        gameState.currentPlayerIndex = 0;
      } else { gameState.currentPlayerIndex++; }
      gameState.hungerRemaining = 6;
      gameState.turnEnded = false;
      
      endOverlay.classList.remove("hidden");
      setTimeout(() => { renderCallback(gameState, renderCallback); }, 3000)
      endOverlay.addEventListener("animationend", () => {
        endOverlay.classList.add("hidden");
        
        
      })
    });
  }
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Go Back";
  actionButtons.appendChild(backButton);
  backButton.addEventListener("click", () => {
    actionModal.classList.add("hidden");
  });
  
  actionModal.classList.remove("hidden");
  
  confirmButton.addEventListener("click", () => {
    gameState.turnEnded = true;
    const { mobsRevealed, gameOverCard } = revealMobs(gameState, 1);
    animateMobReveal(mobsRevealed, gameOverCard, gameState, () => {
      actionModal.classList.add("hidden");
      renderCallback(gameState, renderCallback);
      
      if (gameState.currentPlayerIndex === gameState.players.length - 1) {
        gameState.currentPlayerIndex = 0;
      } else { gameState.currentPlayerIndex++; }
      gameState.hungerRemaining = 6;
      gameState.turnEnded = false;
      
      endOverlay.classList.remove("hidden");
      setTimeout(() => { renderCallback(gameState, renderCallback); }, 3000)
      endOverlay.addEventListener("animationend", () => {
        endOverlay.classList.add("hidden");
      });
    });
  });
}