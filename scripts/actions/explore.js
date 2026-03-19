export function exploreLandscape(gameState, renderCallback, landscapeCard) {

	const actionModal = document.getElementById("action-modal");
	actionModal.classList.remove("hidden");
	const modalCardInfo = document.getElementById("modal-card-info");
	modalCardInfo.innerHTML=''
	const landscapeCardView = document.createElement("img");
	landscapeCardView.src = `images/landscapes/${landscapeCard.visual}.jpg`;
	landscapeCardView.classList.add("card", "modal-landscape");	modalCardInfo.appendChild(landscapeCardView);
}