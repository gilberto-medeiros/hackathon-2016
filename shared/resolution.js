var resolution = function(match) {

  // Pre process
  for (i in match.players) {
    var currPlayer = match.players[i];
    if(currPlayer.currHandIndex != -1) {
      var currCard = currPlayer.getCardInHand();
      if (currCard.constructor === Block) {
        console.log('it is a block')
      }
      // Process blocks
      
    }
  }
}

module.exports = resolution
