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
  const winOverlay = document.getElementById("win-overlay");
  
  //Make Instructions
  const instructions = document.createElement("div");
  instructions.textContent = "You may add any number of items to chests before your next action."
  let cost = (gameState.lastActionTaken === "fill") ? 0 : 1;
  
  //Item Image
  
  function showChestCard() {
    const card = document.createElement("div");
    card.classList.add("card", "modal-portrait", "chest-card");
    const cardImage = document.createElement("img");
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
      currentFill[index] = "None";
      
      
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
      if (gameState.hungerRemaining < 1 && gamestate.lastActionTaken!="fill") {
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
  backButton.textContent = `Back (${gameState.lastActionTaken})`;
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
    });
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
    
    //Define mob reward logic
    function useCrossbow() {
      coverButtons.innerHTML = '';
      boardCover.classList.remove("hidden");
      mobZone.style.zIndex = "4";
      mobZone.dataset.actionMode = "crossbow";
      const doneButton = document.createElement("button");
      doneButton.classList.add("tap-control", "button");
      let rect = mobZone.getBoundingClientRect();
      coverButtons.style.top = (rect.top + rect.height + 30).toString() + "px";
      coverMessage.innerHTML = "Select a mob to kill.";
      coverMessage.style.top = (rect.top / 2).toString() + "px";
      console.log("onuse" + mobZone.dataset.actionMode)
      doneButton.textContent = "Fight Selected (0🍖)";
      doneButton.addEventListener("click", () => {
        const selectedIndices = [...mobZone.querySelectorAll("[data-selected-for-kill]")]
          .map(el => parseInt(el.dataset.selectedForKill))
          .sort((a, b) => b - a);
        if (selectedIndices.length <= 1) {
          selectedIndices.forEach((index) => {
            //got here
            const [newTrophy] = gameState.mobsOnBoard.splice(index, 1);
            playerTrophies.push(newTrophy);
          });
          boardCover.classList.add("hidden");
          mobZone.style.removeProperty("z-index");
          renderCallback(gameState, renderCallback);
        } else {
          
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
    
    //Handle Closed Chest
    if (chest.placedItems.length === chest.fillItems.length) {
      
      
      //Check win condition
      const filledChests = gameState.chests.filter(chest => chest.placedItems.length === chest.fillItems.length);
      if (filledChests.length >= chests.length-1) {
        
        const victoryOptions = ["Fireworks","MobDance","SteveDance","villagerBrow","Dennis","pigMine","JasonOkay","alexDance","creeperNo","zombieJam","witchClub","villagerDance","mobRoomDance","heroDance","enderDance"]
        const victoryIndex = Math.floor(Math.random() * victoryOptions.length);
        console.log(victoryIndex)
        const victoryImage = `url("images/${victoryOptions[victoryIndex]}.GIF")`
        winOverlay.style.backgroundImage = victoryImage;
        
        const team = document.getElementById("team");
        team.innerHTML = '🏆 Winners 🏆';
        const winDifficulty = document.getElementById("win-difficulty");
        winDifficulty.textContent = `Difficulty: ${gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1).toLowerCase()}`;
        gameState.players.forEach((player) => {
          const playerName = document.createElement("div");
          playerName.textContent = player.name;
          playerName.classList.add("death-message");
          team.appendChild(playerName);
        });
        const playAgain = document.getElementById("win-play-again");
        playAgain.addEventListener("click", () => {location.reload()})
        winOverlay.classList.remove("hidden");
        localStorage.clear();
        
      } else {
        backButton.innerHTML = '';
        backButton.textContent = "Choose a mob"
        backButton.addEventListener("click", () => {
          useCrossbow();
        })
      }
    }
  })
}