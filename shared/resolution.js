var resolution = function(match) {
  //console.log('Resolution Running...')

  //console.log(match.players[0])

  // Pre process
  for (i in match.players) {
    var currPlayer = match.players[i];
    //console.log(match.activeCards[i]);
    if(match.activeCards[i] != undefined) {
      //var currCard = currPlayer.deck.getCardInHand(match.activeCards[i]);
    }
  }



}

module.exports = resolution
