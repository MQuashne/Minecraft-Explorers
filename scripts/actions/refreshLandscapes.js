export function refreshLandscapes(gameState, renderCallback){
  
  const landscapeZone = document.getElementById("landscape-zone")
  const boardButtons=document.querySelectorAll('.board-button');
  const doneButton=document.getElementById("refresh-these");
  const boardCover=document.getElementById("board-cover");
  boardCover.classList.remove("hidden");
  landscapeZone.style.zIndex="4";
  landscapeZone.dataset.actionMode="refresh";
}