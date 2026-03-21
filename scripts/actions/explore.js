function buildTestInv() {
	const testInv = [{
			id: "item_diamond_sword_02",
			visual: "item_diamond_sword_mob",
			name: "Diamond Sword",
			category: "sword",
			bonusValue: 4,
			state: "intact",
			isUsable: true,
		},

		// --- Pickaxes ---
		{
			id: "item_iron_pickaxe_01",
			visual: "item_iron_pickaxe",
			name: "Iron Pickaxe",
			category: "pickaxe",
			bonusValue: 2,
			state: "intact",
			isUsable: true,
		},
		{
			id: "item_iron_pickaxe_02",
			visual: "item_iron_pickaxe",
			name: "Iron Pickaxe",
			category: "pickaxe",
			bonusValue: 2,
			state: "damaged",
			isUsable: true,
		}
	];
	return testInv;
}


export function exploreLandscape(gameState, renderCallback, landscapeCard) {

	const testInv = buildTestInv();
	const debug = document.getElementById("modal-debug");
	const actionModal = document.getElementById("action-modal");
	actionModal.classList.remove("hidden");
	const modalCardInfo = document.getElementById("modal-card-info");
	modalCardInfo.innerHTML = ''
	const landscapeCardView = document.createElement("img");
	landscapeCardView.src = `images/landscapes/${landscapeCard.visual}.jpg`;
	landscapeCardView.classList.add("card", "modal-landscape");
	modalCardInfo.appendChild(landscapeCardView);

	//------------
	//Buttons
	//------------
	if (landscapeCard.subtype === "explore") {
		let cost = landscapeCard.cost;
		//Explore Button
		const actionButtons = document.getElementById("modal-action-buttons");
		const exploreButton = document.createElement("button")
		exploreButton.id = "explore-button";
		exploreButton.classList.add("tap-control", "button");
		exploreButton.textContent = `Explore   (${cost}🍖)`;
		if (cost <= gameState.hungerRemaining) {
			exploreButton.addEventListener("click", () => { executeExplore(gameState, landscapeCard, renderCallback, cost) });
		} else { exploreButton.classList.add("disabled") }
		actionButtons.appendChild(exploreButton);

		if (landscapeCard.toolDiscount) {
			const playerInventory = gameState.players[gameState.currentPlayerIndex].inventory;
			//Change to actual inventory!!
			const playerTools = testInv.filter(item => item.category === landscapeCard.toolDiscount);

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
						debug.innerHTML = `cost=${cost} disc=${event.target.value}`
						cost = Math.max(cost - event.target.value, 0);
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
}


function executeExplore(gameState, landscapeCard, renderCallback, cost) {

}