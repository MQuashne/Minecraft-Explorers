import { Items } from "../cardData.js"

export function exploreLandscape(gameState, renderCallback, landscapeCard) {
  
  const playerInventory = gameState.players[gameState.currentPlayerIndex].inventory
  const itemCard = Items.find(item => item.id === landscapeCard.item);
  const debug = document.getElementById("modal-debug");
  const actionModal = document.getElementById("action-modal");
  actionModal.classList.remove("hidden");
  
  
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
  
  
  //------------
  //Buttons
  //------------
  if (landscapeCard.subtype === "explore") {
    //Explore Button
    
    const exploreButton = document.createElement("button")
    exploreButton.id = "explore-button";
    exploreButton.classList.add("tap-control", "button");
    exploreButton.textContent = `Explore   (${cost}🍖)`;
    if (cost <= gameState.hungerRemaining) {
      exploreButton.addEventListener("click", () => { executeExplore() });
    } else { exploreButton.classList.add("disabled") }
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
            const exButton = document.getElementById('explore-button');
            exButton.textContent = `Explore   (${cost}🍖)`;
            if (cost <= gameState.hungerRemaining) {
              exButton.classList.remove("disabled");
            } else { exploreButton.classList.add("disabled"); }
          });
          useChoiceGroup.appendChild(useSelect);
          actionButtons.appendChild(useChoiceGroup);
        });
      }
    }
  }
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
    });
    // --- Reveal Item, place in inventory, and change buttons ---
    flipInner.classList.add("flipped");
    playerInventory.push(itemCard);
    actionButtons.innerHTML = '';
    const placeButton = document.createElement("button");
    placeButton.classList.add("tap-control", "button");
    placeButton.addEventListener("click", () => {
      actionModal.classList.add("hidden");
      renderCallback(gameState, renderCallback);
    });
    placeButton.innerText = "Place in Inventory"
    actionButtons.appendChild(placeButton)
  }
}