export function revealMobs(gameState, revealCount, renderCallback) {
  const boardMobs = gameState.mobsOnBoard;
  const deck = gameState.mobDeck;
  const mobsRevealed = [];
  let newMob = {};
  let gameOverCard = false;
  revealCount+=3;
  while (revealCount > 0) {
    newMob = deck.splice(0, 1)[0];
    newMob.isOverrun = false;
    if (newMob.id === "mob_game_over") {
      gameOverCard = true;
      break;
    }
    if (boardMobs.filter(mob => mob.id === newMob.id).length > 0) {
      newMob.isOverrun = true;
      revealCount++;
    }
    revealCount--;
    boardMobs.push(newMob);
    mobsRevealed.push(newMob);
  }
  if (gameOverCard) {
    handleGameOver();
  }
  return { mobsRevealed, gameOverCard }
}

export function animateMobReveal(mobsRevealed, gameOverCard, onComplete) {
  let currentIndex = 0;
  const actionModal = document.getElementById("action-modal");
  const modalContainer=document.getElementById("modal-container");
  modalContainer.style.overflowX="scroll";
  
  const modalCardInfo = document.getElementById("modal-card-info");
  modalCardInfo.innerHTML = ''
  
  const actionButtons = document.getElementById("modal-action-buttons");
  actionButtons.innerHTML = '';
  
  const revealInstructions = document.createElement("div");
  
  // Instructions
  revealInstructions.textContent = "Tap to reveal mobs";
  revealInstructions.classList.add("option-label");
  modalCardInfo.appendChild(revealInstructions);
  
  // Row of mob deck and cards 
  
  const mobModalRow = document.createElement("div");
  mobModalRow.classList.add("game-row");
  mobModalRow.style.height = `calc(2 * var(--card-long) + 30px)`;
  mobModalRow.style.justifyContent="flex-start";
  
  
  const modalMobZone = document.createElement("div");
  modalMobZone.classList.add("zone");
  modalMobZone.style.minWidth = `calc(2 * var(--card-short)+16px)`;
  
  
  
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card-portrait");
  mobModalRow.appendChild(flipCard);
  mobModalRow.appendChild(modalMobZone);
  modalCardInfo.appendChild(mobModalRow);
  const flipInner = document.createElement("div");
  flipInner.classList.add("flip-card-portrait-inner");
  const flipFront = document.createElement("img");
  flipFront.src = `images/mobs/mob_back.jpg`;
  flipFront.classList.add("card", "modal-portrait", "flip-card-front");
  const flipBack = document.createElement("div");
  flipBack.classList.add("card", "modal-portrait", "flip-card-back");
  const mobImage = document.createElement("img");
  mobImage.src = `images/mobs/${mobsRevealed[0].id}.jpg`;
  flipBack.appendChild(mobImage);
  flipInner.appendChild(flipFront);
  flipInner.appendChild(flipBack);
  flipCard.appendChild(flipInner);
  flipInner.addEventListener("click", () => {
    flipInner.classList.add("flipped");
    flipInner.addEventListener('transitionend', () => {
      const newMob = document.createElement("div");
      newMob.classList.add("card", "modal-portrait", "mob-card");
      const newMobImage = document.createElement("img");
      newMobImage.src = `images/mobs/${mobsRevealed[currentIndex].id}.jpg`;
      newMob.appendChild(newMobImage);
      modalMobZone.prepend(newMob);
      
      if (mobsRevealed[currentIndex].isOverrun) {
        revealInstructions.textContent = "OVERRUN!! Tap to reveal another mob!";
      }
      currentIndex++;
      if (currentIndex < mobsRevealed.length) {
        flipInner.classList.remove("flipped");
        mobImage.src = `images/mobs/${mobsRevealed[currentIndex].id}.jpg`;
      } else {
        flipInner.classList.remove("flipped");
        revealInstructions.innerHTML = '';
        const backButton = document.createElement("button");
        backButton.classList.add("tap-control", "button");
        backButton.textContent = "Back to Board";
        backButton.addEventListener("click", () => {
          onComplete();
        })
        actionButtons.appendChild(backButton);
      }
      // safe to reset here
    }, { once: true });
    
  });
  
  
}