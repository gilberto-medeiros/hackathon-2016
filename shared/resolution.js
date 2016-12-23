var Attack = require('../shared/attack')
var Block = require('../shared/block')
var Counter = require('../shared/counter')

var resolution = function(match) {

  var getOpponent = function(index) {
    return match.players[index == 0 ? 1 : 0];
  }

  // Pre process
  for (i in match.players) {
    // Get players
    var currPlayer = match.players[i];
    var oppoPlayer = getOpponent(i);

    if(currPlayer.currHandIndex != -1) {
      var currCard = currPlayer.getCardInHand();

      // Pre Process Blocks
      if (currCard.constructor === Block) {
        if(currCard.target == 'Head') {player.headLane.stackBlock(currCard.damage)};
        if(currCard.target == 'Body') {player.bodyLane.stackBlock(currCard.damage)};
        if(currCard.target == 'Legs') {player.legsLane.stackBlock(currCard.damage)};
      }

      // Pre Process attack
      if (currCard.constructor === Attack) {
        //currPlayer.setBlockable(false);
      }

    }
  }


}

module.exports = resolution
