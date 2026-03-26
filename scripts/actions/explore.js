import { Items } from "../cardData.js"
import { revealMobs, animateMobReveal } from "./revealMobs.js"

export function exploreLandscape(gameState, renderCallback, landscapeCard) {
  
  // Get places in document
  const playerInventory = gameState.players[gameState.currentPlayerIndex].inventory
  const itemCard = Items.find(item => item.id === landscapeCard.item);
  const debug = document.getElementById("modal-debug");
  const actionModal = document.getElementById("action-modal");
  actionModal.classList.remove("hidden");
  
  // Create card display
  const modalCardInfo = document.getElementById("modal-card-info");
  modalCardInfo.innerHTML = ''
  
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");
  const flipInner = document.createElement("div");
  flipInner.classList.add("flip-card-inner");
  const flipFront = document.createElement("img");
  flipFront.src = `images/landscapes/${landscapeCard.visual}.jpg`;
  flipFront.classList.add("card", "modal-landscape", "flip-card-front");
  const flipBack = document.createElement("div");
  flipBack.classList.add("card", "modal-landscape", "flip-card-back");
  const itemImage = document.createElement("img");
  itemImage.src = `images/items/${itemCard.visual}.jpg`;
  itemImage.style.transform = "rotate(90deg)";
  itemImage.style.width = `calc(2 * var(--card-short))`;
  itemImage.style.height = `calc(2 * var(--card-long))`;
  flipBack.appendChild(itemImage);
  
  flipInner.appendChild(flipFront);
  flipInner.appendChild(flipBack);
  flipCard.appendChild(flipInner);
  modalCardInfo.appendChild(flipCard);
  
  const actionButtons = document.getElementById("modal-action-buttons");
  actionButtons.innerHTML = '';
  let cost = landscapeCard.cost;
  const playerTools = playerInventory.filter(item => item.category === landscapeCard.toolDiscount);
  const toolDiscounts = {};
  let chosenTrade="";
  
  
  //------------
  //Buttons
  //------------
  // Buttons for landscapes
  if (landscapeCard.subtype === "explore") {
    //Explore Button
    
    const exploreButton = document.createElement("button")
    exploreButton.id = "explore-button";
    exploreButton.classList.add("tap-control", "button");
    exploreButton.textContent = `Explore   (${cost}🍖)`;
    exploreButton.addEventListener("click", () => { executeExplore() });
    if (cost > gameState.hungerRemaining) {
      exploreButton.disabled = true;
      
    } else { exploreButton.disabled = false }
    actionButtons.appendChild(exploreButton);
    
    //Tool Buttons
    if (landscapeCard.toolDiscount) {
      if (playerTools.length > 0) {
        
        playerTools.forEach((tool) => {
          const useChoiceGroup = document.createElement("div")
          const uses = (tool.state === "intact") ? "(2/2)" : "(1/2)";
          const discount = document.createElement("span");
          discount.style.cssFloat = "right";
          discount.textContent = `-${tool.bonusValue}🍖`;
          useChoiceGroup.innerHTML = `${tool.name} ${uses}`;
          useChoiceGroup.appendChild(discount);
          const useSelect = document.createElement("select")
          useSelect.classList.add("tap-control", "dropdown");
          for (let i = 0; i < 3; i++) {
            if (i < 2 || tool.state === "intact") {
              const option = document.createElement("option");
              option.value = i * tool.bonusValue;
              option.text = `Use x${i}`;
              useSelect.appendChild(option);
            }
          }
          useSelect.addEventListener("change", (event) => {
            toolDiscounts[tool.id] = parseInt(event.target.value);
            const totalDiscount = Object.values(toolDiscounts).reduce((sum, val) => sum + val, 0);
            cost = Math.max(landscapeCard.cost - totalDiscount, 0);
            exploreButton.textContent = `Explore   (${cost}🍖)`;
            if (cost <= gameState.hungerRemaining) {
              exploreButton.disabled = false;
            } else { exploreButton.disabled = true }
          });
          useChoiceGroup.appendChild(useSelect);
          actionButtons.appendChild(useChoiceGroup);
        });
      }
    }
  } else if (landscapeCard.subtype === "village") {
    // Buttons for villages
    const chooseTrade = document.createElement("div");
    chooseTrade.textContent = "Select an item to trade";
    
    // Item Chooser
    const tradeSelector = document.createElement("select");
    tradeSelector.classList.add("tap-control", "dropdown");
    playerInventory.forEach((item) => {
      if (item.category === landscapeCard.tradeItem || item.category === "emerald") {
        const itemOption = document.createElement("option");
        itemOption.value = item.id;
        itemOption.text = item.name;
        tradeSelector.appendChild(itemOption);
      }
    });
    chooseTrade.appendChild(tradeSelector);
    actionButtons.appendChild(chooseTrade);
    
    // Trade Button
    const tradeButton = document.createElement("button")
    tradeButton.id = "explore-button";
    tradeButton.classList.add("tap-control", "button");
    tradeButton.textContent = `Trade   (${cost}🍖)`;
    tradeButton.addEventListener("click", () => {
      chosenTrade=tradeSelector.value;
      executeExplore() 
      
    });
    if (cost > gameState.hungerRemaining || tradeSelector.value==='' || tradeSelector.value===null) {
      tradeButton.disabled = true;
      
    } else { tradeButton.disabled = false }
    actionButtons.appendChild(tradeButton);
    
    
  }
  
  // Go Back Button
  const backButton = document.createElement("button");
  backButton.classList.add("tap-control", "button");
  backButton.textContent = "Go Back";
  backButton.addEventListener("click", () => {
    actionModal.classList.add("hidden");
  });
  actionButtons.appendChild(backButton);
  
  
  function executeExplore() {
    // --- Deduct exploration cost --
    gameState.hungerRemaining -= cost;
    
    // --- adddamage to tool's and discard broken ones --- 
    if (landscapeCard.subtype==="explore"){
    let index = 0;
    playerTools.forEach((tool) => {
      if (toolDiscounts[tool.id] > 0) {
        const uses = toolDiscounts[tool.id] / tool.bonusValue;
        if (tool.state === "damaged") {
          tool.state = "broken";
          index = playerInventory.indexOf(tool);
          playerInventory.splice(index, 1);
        } else if (uses === 1) {
          tool.state = "damaged"
        } else {
          tool.state = "broken";
          index = playerInventory.indexOf(tool);
          playerInventory.splice(index, 1);
        }
      }
    });} else if (landscapeCard.subtype==="village"){
      //Remove traded item from inventory 
      const tradedItem=playerInventory.find(obj => obj.id === chosenTrade);
      const tradeIndex = playerInventory.indexOf(tradedItem);
      playerInventory.splice(tradeIndex,1);
    }
    // --- Reveal Item, place in inventory, and change buttons ---
    flipInner.classList.add("flipped");
    playerInventory.push(itemCard);
    actionButtons.innerHTML = '';
    
    if (landscapeCard.mobCount > 0) {
      const revealButton = document.createElement("button");
      revealButton.classList.add("tap-control", "button")
      revealButton.textContent = "Reveal Mobs"
      revealButton.addEventListener("click", () => {
        
        const { mobsRevealed, gameOverCard } = revealMobs(gameState, landscapeCard.mobCount);
        animateMobReveal(mobsRevealed, gameOverCard, gameState, () => {
          actionModal.classList.add("hidden");
          const landscapeSpot = gameState.landscapesOnBoard.indexOf(landscapeCard);
          gameState.landscapesOnBoard.splice(landscapeSpot, 1);
          renderCallback(gameState, renderCallback);
        });
        
        
      });
      actionButtons.appendChild(revealButton);
    } else {
      
      const placeButton = document.createElement("button");
      placeButton.classList.add("tap-control", "button");
      placeButton.addEventListener("click", () => {
        actionModal.classList.add("hidden");
        const landscapeSpot = gameState.landscapesOnBoard.indexOf(landscapeCard);
        gameState.landscapesOnBoard.splice(landscapeSpot, 1);
        renderCallback(gameState, renderCallback);
      });
      placeButton.innerText = "Place in Inventory"
      actionButtons.appendChild(placeButton)
    }
  }
}