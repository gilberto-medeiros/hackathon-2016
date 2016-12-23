var resolution = function(match) {

  // Pre process
  for (i in match.players) {
    var currPlayer = match.players[i];
    if(currPlayer.currHandIndex != -1) {
      var currCard = currPlayer.getCardInHand();
      console.log(currCard);
      //console.log(currPlayer + ' ' + currCard.id);
    } else {
      //console.log(i + ' no card chosen.')
    }
  }



}

module.exports = resolution
