export function revealMobs(gameState, revealCount, renderCallback) {
  const boardMobs = gameState.mobsOnBoard;
  const deck = gameState.mobDeck;
  const mobsRevealed = [];
  let newMob = {};
  let gameOverCard = false;
  while (revealCount > 0) {
    newMob = deck.splice(0, 1)[0];
    newMob.isOverrun = false;
    /*if (newMob.id === "mob_game_over") {
      gameOverCard = true;
      break;
    }*/
    if (boardMobs.filter(mob => mob.id === newMob.id).length > 0) {
      newMob.isOverrun = true;
      revealCount++;
    }
    revealCount--;
    boardMobs.push(newMob);
    mobsRevealed.push(newMob);
  }
  console.log(mobsRevealed);
  /*if (gameOverCard) {
    handleGameOver();
  }*/
  return { mobsRevealed, gameOverCard }
}

export function animateMobReveal(mobsRevealed, gameOverCard, gameState, onComplete) {
  let currentIndex = 0;
  const actionModal = document.getElementById("action-modal");
  const modalContainer = document.getElementById("modal-container");
  
  const modalCardInfo = document.getElementById("modal-card-info");
  modalCardInfo.innerHTML = '';
  modalCardInfo.style.overflowX="scroll";
  
  const actionButtons = document.getElementById("modal-action-buttons");
  actionButtons.innerHTML = '';
  
  const revealInstructions = document.createElement("div");
  
  // Instructions
  revealInstructions.textContent = "Tap to reveal mobs";
  revealInstructions.classList.add("option-label");
  modalCardInfo.appendChild(revealInstructions);
  
  // Row of mob deck and cards 
  
  const mobModalRow = document.createElement("div");
  mobModalRow.style.display = "flex";
  mobModalRow.style.flexDirection = "row";
  mobModalRow.style.gap = "8px";
  mobModalRow.style.alignItems = "center";
  mobModalRow.style.height = `calc(2 * var(--card-long) + 30px)`;
  mobModalRow.style.alignSelf = "flex-start";
  
  
  
  
  
  const modalMobZone = document.createElement("div");
  modalMobZone.classList.add("zone");
  modalMobZone.style.minWidth = `calc(2 * var(--card-short)+px)`;
  modalMobZone.style.overflowX = "auto";
  modalMobZone.style.flex = "1";
  modalMobZone.style.justifyContent = "flex-start";
  
  const placeMob = document.createElement("div");
  placeMob.classList.add("card", "modal-portrait", "mob-card", "placeholder-card");
  modalMobZone.prepend(placeMob);
  
  
  
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
    void flipInner.offsetWidth;
    flipInner.classList.add("flipped");
    flipInner.addEventListener('transitionend', () => {
     if (event.propertyName !== 'transform') return;
    console.log("through");
      const newMob = document.createElement("div");
      newMob.classList.add("card", "modal-portrait", "mob-card");
      const newMobImage = document.createElement("img");
      newMobImage.src = `images/mobs/${mobsRevealed[currentIndex].id}.jpg`;
      newMob.appendChild(newMobImage);
      modalMobZone.prepend(newMob);
      console.log(mobsRevealed[currentIndex].id);
      if (mobsRevealed[currentIndex].id === "mob_game_over") {
        console.log("run");
        const gameOverScreen = document.getElementById("game-over-modal");
        const deathMessage = document.getElementById("killer");
        if (currentIndex > 0) {
          deathMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name} was killed by ${mobsRevealed[currentIndex-1].name}.`
        } else {
          deathMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name} discovered the floor was lava.`
        }
        gameOverScreen.classList.remove("hidden");
        
        //do game over stuff - reset somehow?
      }
      
      if (mobsRevealed[currentIndex].isOverrun) {
        revealInstructions.textContent = "OVERRUN!! Tap to reveal another mob!";
      }
      currentIndex++;
      
      
      if (currentIndex < mobsRevealed.length) {
        
        flipInner.classList.add("no-transition");
        flipInner.classList.remove("flipped");
        void flipInner.offsetWidth;
        flipInner.classList.remove("no-transition");
        
        mobImage.src = `images/mobs/${mobsRevealed[currentIndex].id}.jpg`;
      } else {
        flipInner.classList.add("hidden");
        flipCard.classList.add("hidden");
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