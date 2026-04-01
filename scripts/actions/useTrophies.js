export function useTrophies(gameState, trophyCard, renderCallback) {
  
  //Declarations
  const actionModal = document.getElementById("action-modal");
  const cardInfo = document.getElementById("modal-card-info");
  cardInfo.innerHTML='';
  const actionButtons = document.getElementById("modal-action-buttons");
  actionButtons.innerHTML='';
  const playerTrophies = gameState.players[gameState.currentPlayerIndex].trophies
  const trophyType = trophyCard.id;
  const playerTrophyOfType = playerTrophies.filter(trophy => trophy.id === trophyType);
  //const trophyIndex=playerTrophies.indexOf(trophyCard);
  console.log(trophyCard)
  
  //Set up action modal
  const dualCardDisplay = document.createElement("div");
  dualCardDisplay.classList.add("dual-card-info");
  
  
  //add buttons, words and behavior will change based on conditions below
  
  const tradeButton = document.createElement("button");
  tradeButton.classList.add("tap-control", "button")
  
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Back";
  backButton.addEventListener("click", () => {
    actionModal.classList.add("hidden");
  });
  
  if (playerTrophyOfType.length > 1) {
    for (let i = 0; i <= 1; i++) {
      const trophyImg = document.createElement("img");
      trophyImg.classList.add("card", "modal-portrait");
      console.log(trophyType)
      trophyImg.src = `./images/mobs/${trophyType}.jpg`;
      dualCardDisplay.appendChild(trophyImg);
    }
    tradeButton.textContent=`Sell 2 trophies for +1🍖?`
    tradeButton.addEventListener("click",() => {
      gameState.hungerRemaining++;
      for(let j=0;j<=1;j++){
        const trophyIndex = playerTrophies.indexOf(playerTrophyOfType[j]);
        playerTrophies.splice(trophyIndex,1);
      }
      gameState.lastActionTaken="trophy sale";
      actionModal.classList.add("hidden");
      renderCallback(gameState,renderCallback);
    });
    
    
    
    
    
  } else {
    const trophyImg = document.createElement("img");
    trophyImg.classList.add("card", "modal-portrait");
    trophyImg.src = `../images/mobs/${trophyType}.jpg`;
    dualCardDisplay.appendChild(trophyImg);
    
    const placeholder = document.createElement("div");
    placeholder.classList.add("card", "modal-portrait", "card-space");
    
    dualCardDisplay.appendChild(trophyImg);
    dualCardDisplay.appendChild(placeholder);
    
    tradeButton.textContent = `Need 2 trophies to sell`;
    tradeButton.classList.add("disabled");
    tradeButton.disabled=true;
  }
  actionButtons.appendChild(tradeButton);
  actionButtons.appendChild(backButton);
  cardInfo.appendChild(dualCardDisplay);
  actionModal.classList.remove("hidden");
}