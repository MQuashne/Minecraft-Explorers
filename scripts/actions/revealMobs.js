export function revealMobs(gameState, revealCount) {
  const boardMobs = gameState.mobsOnBoard;
  const deck = gameState.mobDeck;
  const mobsRevealed = [];
  let newMob = {};
  let gameOverCard=false;
  while (revealCount > 0) {
    newMob = deck.splice(0, 1)[0];
    if (newMob.id==="mob_game_over"){
      gameOverCard=true;
      break;
    }
    if (boardMobs.filter(mob => mob.id === newMob.id).length === 0) {
      revealCount--;
    }
    boardMobs.push(newMob);
    mobsRevealed.push(newMob);
  }
  if (gameOverCard){
    handleGameOver();
  }
  return { mobsRevealed, gameOverCard } 
}