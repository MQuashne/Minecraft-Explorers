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
      if (itemCard.category==="food"){
        useFood();
      } //else if...
      
      //for all:
      playerInventory.splice(itemIndex,1);
      actionModal.classList.add("hidden");
      renderCallback(gameState,renderCallback);
      
    });
    actionButtons.appendChild(useButton);
  }
  
  // Go Back Button
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Back";
  backButton.addEventListener("click", () => {
    actionModal.classList.add("hidden");
  });
  actionButtons.appendChild(backButton);
  
  actionModal.classList.remove("hidden");
  
  //Type-Specific Functions
  function useFood(){
    gameState.hungerRemaining+=itemCard.bonusValue
    
  };
}