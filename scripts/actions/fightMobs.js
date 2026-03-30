export function fightMobs(gameState, renderCallback, mobCard) {
  
  //Declarations
  const actionModal = document.getElementById("action-modal");
  const cardInfo = document.getElementById("modal-card-info");
  const actionButtons = document.getElementById("modal-action-buttons");
  const debug = document.getElementById("modal-debug");
  let fightCost = mobCard.cost;
  const playerInventory = gameState.players[gameState.currentPlayerIndex].inventory
  const playerTrophies = gameState.players[gameState.currentPlayerIndex].trophies
  let index=0;
  
  
  const playerWeapons = playerInventory.filter(item => item.category === "sword");
  const weaponDiscounts = {};
  
  //Mob Image
  const mobImage = document.createElement("img");
  mobImage.classList.add("card", "modal-portrait");
  mobImage.src = `images/mobs/${mobCard.id}.jpg`;
  cardInfo.innerHTML = '';
  cardInfo.appendChild(mobImage);
  
  //Fight Button
  const fightButton = document.createElement("button")
  fightButton.id = "fight-button";
  fightButton.classList.add("tap-control", "button");
  fightButton.textContent = `FIGHT!   (${fightCost}🍖)`;
  fightButton.addEventListener("click", () => { executeFight() });
  if (fightCost > gameState.hungerRemaining) {
    fightButton.disabled = true;
    
  } else { fightButton.disabled = false }
  actionButtons.innerHTML = '';
  actionButtons.appendChild(fightButton);
  
  //debug.innerHTML=mobCard;
  
  //Sword Cards
  if (playerWeapons.length > 0) {
    
    playerWeapons.forEach((weapon) => {
      const useChoiceGroup = document.createElement("div")
      const uses = (weapon.state === "intact") ? "(2/2)" : "(1/2)";
      const discount = document.createElement("span");
      discount.style.cssFloat = "right";
      discount.textContent = `-${weapon.bonusValue}🍖`;
      useChoiceGroup.innerHTML = `${weapon.name} ${uses}`;
      useChoiceGroup.appendChild(discount);
      const useSelect = document.createElement("select")
      useSelect.classList.add("tap-control", "dropdown");
      for (let i = 0; i < 3; i++) {
        if (i < 2 || weapon.state === "intact") {
          const option = document.createElement("option");
          option.value = i * weapon.bonusValue;
          option.text = `Use x${i}`;
          useSelect.appendChild(option);
        }
      }
      useSelect.addEventListener("change", (event) => {
        weaponDiscounts[weapon.id] = parseInt(event.target.value);
        const totalDiscount = Object.values(weaponDiscounts).reduce((sum, val) => sum + val, 0);
        fightCost = Math.max(mobCard.cost - totalDiscount, 0);
        fightButton.textContent = `FIGHT!   (${fightCost}🍖)`;
        if (fightCost <= gameState.hungerRemaining) {
          fightButton.disabled = false;
        } else { fightButton.disabled = true }
      });
      useChoiceGroup.appendChild(useSelect);
      actionButtons.appendChild(useChoiceGroup);
    });
  }
  
  // Go Back Button
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Run away scared...";
  backButton.addEventListener("click", () => {
    actionModal.classList.add("hidden");
  });
  actionButtons.appendChild(backButton);
  
  actionModal.classList.remove("hidden");
  
  function executeFight() {
    gameState.hungerRemaining -= fightCost;
    gameState.lastActionTaken="fight";
    
    playerWeapons.forEach((weapon) => {
      if (weaponDiscounts[weapon.id] > 0) {
        const uses = weaponDiscounts[weapon.id] / weapon.bonusValue;
        if (weapon.state === "damaged") {
          weapon.state = "broken";
          index = playerInventory.indexOf(weapon);
          playerInventory.splice(index, 1);
        } else if (uses === 1) {
          weapon.state = "damaged"
        } else {
          weapon.state = "broken";
          index = playerInventory.indexOf(weapon);
          playerInventory.splice(index, 1);
        }
      }
    });
    const mobIndex = gameState.mobsOnBoard.indexOf(mobCard);
    playerTrophies.push(mobCard);
    gameState.mobsOnBoard.splice(mobIndex, 1);
    actionModal.classList.add("hidden");
    renderCallback(gameState, renderCallback);
    
  }
}