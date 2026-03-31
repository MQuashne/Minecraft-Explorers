/*Code for using:

done - food
crossbow
map
spyglass

*/
export function viewItem(gameState, itemCard, renderCallback) {
  
  //Declarations
  const actionModal = document.getElementById("action-modal");
  const cardInfo = document.getElementById("modal-card-info");
  const actionButtons = document.getElementById("modal-action-buttons");
  const playerInventory = gameState.players[gameState.currentPlayerIndex].inventory
  const itemIndex = playerInventory.indexOf(itemCard);
  const landscapeZone = document.getElementById("landscape-zone");
  const mobZone = document.getElementById("mobs-zone");
  const destinationZone = document.getElementById("landscape-destination-zone");
  const landscapeDeck = gameState.landscapeDeck;
  const boardButtons = document.querySelectorAll('.board-button');
  const boardCover = document.getElementById("board-cover");
  const coverButtons = document.getElementById("cover-buttons");
  const coverMessage = document.getElementById("cover-message");
  const playerTrophies = gameState.players[gameState.currentPlayerIndex].trophies;
  
  
  //Item Image
  const itemImage = document.createElement("img");
  console.log(itemCard);
  itemImage.classList.add("card", "modal-portrait");
  itemImage.src = `images/items/${itemCard.visual}.jpg`;
  cardInfo.innerHTML = '';
  actionButtons.innerHTML = '';
  
  cardInfo.style.removeProperty("overflow-x");
  cardInfo.appendChild(itemImage);
  
  //Use Button
  if (itemCard.isUsable) {
    const useButton = document.createElement("button")
    useButton.classList.add("tap-control", "button");
    useButton.textContent = `Use ${itemCard.name}`;
    useButton.addEventListener("click", () => {
      if (itemCard.category === "food") {
        useFood();
      } else if (itemCard.category==="crossbow"){
        useCrossbow();
      }
      //Always remove item:
      
      actionModal.classList.add("hidden");
      
      
    });
    actionButtons.appendChild(useButton);
  }
  
  // Go Back Button
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Back";
  backButton.addEventListener("click", () => {
    actionModal.classList.add("hidden");
    renderCallback(gameState, renderCallback);
  });
  actionButtons.appendChild(backButton);
  
  actionModal.classList.remove("hidden");
  
  //----------------------  
  //Type-Specific Functions
  //----------------------
  function useFood() {
    gameState.hungerRemaining += itemCard.bonusValue;
    playerInventory.splice(itemIndex, 1);
    gameState.lastActionTaken="food";
    renderCallback(gameState, renderCallback);
  };
  
  
  function useCrossbow() {
    coverButtons.innerHTML = '';
    boardCover.classList.remove("hidden");
    mobZone.style.zIndex = "4";
    mobZone.dataset.actionMode = "crossbow";
    const doneButton = document.createElement("button");
    doneButton.classList.add("tap-control", "button");
    let rect = mobZone.getBoundingClientRect();
    coverButtons.style.top = (rect.top + rect.height + 30).toString() + "px";
    coverMessage.innerHTML = "Select up to two mobs to kill.";
    coverMessage.style.top = (rect.top / 2).toString() + "px";
    console.log("onuse" + mobZone.dataset.actionMode)
    doneButton.textContent = "Fight Selected";
    doneButton.addEventListener("click", () => {
      const selectedIndices = [...mobZone.querySelectorAll("[data-selected-for-kill]")]
        .map(el => parseInt(el.dataset.selectedForKill))
        .sort((a, b) => b - a);
      if (selectedIndices.length <= 2) {
        selectedIndices.forEach((index) => {
          //got here
          const [newTrophy] = gameState.mobsOnBoard.splice(index, 1);
          playerTrophies.push(newTrophy);
        });
        boardCover.classList.add("hidden");
        mobZone.style.removeProperty("z-index");
        playerInventory.splice(itemIndex, 1);
        gameState.lastActionTaken="crossbow"
        renderCallback(gameState, renderCallback);
      }else{
        
      }
    })
    const backButton = document.createElement("button");
    backButton.classList.add("tap-control", "button");
    backButton.textContent = "Back to Board";
    backButton.addEventListener("click", () => {
      boardCover.classList.add("hidden");
      mobZone.style.removeProperty("z-index");
      renderCallback(gameState, renderCallback);
    })
    
    coverButtons.appendChild(doneButton);
    coverButtons.appendChild(backButton);
  }
  
}