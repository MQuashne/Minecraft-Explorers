//entry point: user taps on chest
//pass in; chest, gamestate, render

//Change slot css to percentages!!!

//------------
//DECLARATIOMS
//------------

/*modal
card info
action buttons
mob row
inventory
*/

export function viewChest(gameState, chest, renderCallback) {
  
  //Declarations
  const actionModal = document.getElementById("action-modal");
  const cardInfo = document.getElementById("modal-card-info");
  cardInfo.innerHTML = '';
  const actionButtons = document.getElementById("modal-action-buttons");
  actionButtons.innerHTML = '';
  const playerInventory = gameState.players[gameState.currentPlayerIndex].inventory
  const chests = gameState.chests
  const chestIndex = chests.indexOf(chest);
  const mobZone = document.getElementById("mobs-zone");
  const boardButtons = document.querySelectorAll('.board-button');
  const boardCover = document.getElementById("board-cover");
  const coverButtons = document.getElementById("cover-buttons");
  coverButtons.innerHTML = '';
  const coverMessage = document.getElementById("cover-message");
  const playerTrophies = gameState.players[gameState.currentPlayerIndex].trophies;
  
  //Make Instructions
  const instructions = document.createElement("div");
  instructions.textContent = "You may add any number of items to chests before your next action."
  let cost = (gameState.lastActionTaken === "fill") ? 0 : 1;
  
  //Item Image
  
  function showChestCard() {
    const card = document.createElement("div");
    card.classList.add("card", "modal-portrait", "chest-card");
    const cardImage = document.createElement("img");
    console.log(chest.fillItems.length);
    console.log(chest.placedItems.length);
    // Chest is fully filled — show closed chest
    if (chest.placedItems.length === chest.fillItems.length) {
      cardImage.src = `images/chests/chest_filled.jpg`;
      cardImage.classList.add("card-image");
      card.appendChild(cardImage);
    } else {
      // Chest is empty or partially filled — show open chest card
      cardImage.src = `images/chests/${chest.id}.jpg`;
      cardImage.classList.add("card-image");
      card.appendChild(cardImage);
      
      // Partially filled — add indicator to correct slot
      if (chest.placedItems.length === 1) {
        const filledSlot = document.createElement("div");
        if (chest.placedItems[0] === chest.fillItems[0]) {
          filledSlot.classList.add("chest-slot", "chest-slot-1", "filled");
        } else {
          filledSlot.classList.add("chest-slot", "chest-slot-2", "filled");
        }
        card.appendChild(filledSlot);
      }
    }
    
    return card;
  }
  
  const card = showChestCard();
  cardInfo.appendChild(card);
  
  let double = false;
  if (chest.fillItems[1]) {
    if (chest.fillItems[0] === chest.fillItems[1]) {
      double = true;
    }
  }
  
  const currentFill = [];
  //add dropdowns for unfilled slots
  chest.fillItems.forEach((item, index) => {
    const numPlaced = chest.placedItems.filter(placedItem => placedItem === item).length;
    
    
    
    
    
    if (numPlaced < 1 || (double && chest.placedItems.length === 0) || (double && chest.placedItems.length === 1 && index === 0)) {
      const playerItems = playerInventory.filter(playerItem => playerItem.category === item);
      const fillGroup = document.createElement("div");
      const groupLabel = document.createElement("div");
      groupLabel.textContent = `${item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()} Item:`
      const itemSelect = document.createElement("select");
      itemSelect.classList.add("tap-control", "dropdown");
      const noneOption = document.createElement("option");
      noneOption.value = "None";
      noneOption.text = "None";
      itemSelect.appendChild(noneOption);
      playerItems.forEach((chooseItem) => {
        const option = document.createElement("option");
        option.value = chooseItem.id;
        if (chooseItem.category === "pickaxe" || chooseItem.category === "sword") {
          option.text = `${chooseItem.name} (${chooseItem.state})`
        } else {
          option.text = chooseItem.name;
        }
        itemSelect.appendChild(option);
      });
      currentFill[index] = "None"
      //on change of dropdown selection
      /*itemSelect.addEventListener("change", () => {
      currentFill[index]=itemSelect.value;
      let countReal = currentFill.filter(currentItem => currentItem!="None").length;
      if (countReal>0){
        fillButton.disabled=false;
        fillButton.textContent = `Place Items   (1🍖)`;
      } else {
        fillButton.disabled=true;
        fillButton.textContent = `Select Items`;

      }
      console.log(currentFill);
      console.log(countNone);
        
      });*/
      
      
      fillGroup.appendChild(groupLabel);
      fillGroup.appendChild(itemSelect);
      actionButtons.appendChild(fillGroup);
    }
  });
  
  // After building all selects, add cross-update behavior
  const allSelects = actionButtons.querySelectorAll('select');
  allSelects.forEach((select, i) => {
    select.addEventListener("change", () => {
      currentFill[i] = select.value;
      let countReal = currentFill.filter(currentItem => currentItem != "None").length;
      if (gameState.hungerRemaining < 1) {
        fillButton.disabled = true;
        fillButton.textContent = `Place Items   (${cost}🍖)`;
      } else if (countReal > 0) {
        fillButton.disabled = false;
        fillButton.textContent = `Place Items   (${cost}🍖)`;
      } else {
        fillButton.disabled = true;
        fillButton.textContent = `Select Items`;
      }
      // Update other selects to remove this selection
      allSelects.forEach((otherSelect, j) => {
        if (i === j) return;
        const currentValue = otherSelect.value;
        [...otherSelect.options].forEach(option => {
          option.disabled = option.value === currentFill[i] && option.value !== "None";
        });
      });
    });
  });
  
  // Fill Button
  const fillButton = document.createElement("button")
  fillButton.id = "fill-button";
  fillButton.classList.add("tap-control", "button");
  fillButton.textContent = "Select items";
  fillButton.disabled = true;
  actionButtons.appendChild(fillButton);
  
  // Go Back Button
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Back";
  backButton.addEventListener("click", () => {
    actionModal.classList.add("hidden");
    renderCallback(gameState, renderCallback);
  });
  
  actionButtons.appendChild(backButton);
  const debug = document.createElement("div");
  actionButtons.appendChild(debug);
  debug.innerHTML = chest.placedItems
  
  
  actionModal.classList.remove("hidden");
  
  //Fill button actions 
  fillButton.addEventListener("click", () => {
    const chosenFill = currentFill.filter(fill => fill != "None");
    chosenFill.forEach((choice) => {
      const index = playerInventory.findIndex(item => item.id === choice);
      chest.placedItems.push(playerInventory[index].category);
      playerInventory.splice(index, 1);
      
      //add item to chest filled array
      
      //charge one hunger
      //change lastActionTaken
      gameState.hungerRemaining -= cost;
      gameState.lastActionTaken = "fill";
      
      //update visuals and add instructions
      const updatedCard = showChestCard();
      cardInfo.innerHTML = '';
      cardInfo.appendChild(updatedCard);
      actionButtons.innerHTML = '';
      const instructions = document.createElement("div");
      instructions.textContent = "You may add items to additional chests at no cost before your next action."
      actionButtons.appendChild(instructions);
      actionButtons.appendChild(backButton);
      
      
      //update card visual to back or with cover boxes
    })
    
  });
  
  
  
  /*

  
  //-----------------
  //Fill Button Listener
  //-----------------
  
  //Remove item from inventory
  //add item to chest filled array
  //charge one hunger
  //change lastActionTaken
  //update card visual to back or with cover boxes
  
  //Check for full
  
  //if not full, show pop up that additional fills are free with "ok" button?
  
  //back to board
  
  //otherwise...
  
  //-------------
  //ChestConplete
  //-------------
  
  //check win condition
  //if win, do win stuff
  
  //otherwise change chest card to back - fix render logic so those don't get a listener.
  //bring mob select to the top, just copy over the crossbow logic here.
  //show free stuff pop up
  //back to board.
  */
}