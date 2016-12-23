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
      if(currCard.cost > currPlayer.stamina) break;

      // Process stamina
      //console.log(currCard.cost);
      staminaCost = currCard.cost;
      currPlayer.addStamina(-staminaCost);

      // Pre Process Blocks
      if (currCard.constructor === Block) {
        currPlayer.stackBlock(currCard.damage, currCard.target);
        //if(currCard.target == 'Head') {currPlayer.headLane.stackBlock(currCard.damage)};
        //if(currCard.target == 'Body') {currPlayer.bodyLane.stackBlock(currCard.damage)};
        //if(currCard.target == 'Legs') {currPlayer.legsLane.stackBlock(currCard.damage)};
      }

      // Pre Process attack
      if (currCard.constructor === Attack) {
        currPlayer.setUnblockable();
      }

    }
  }

  // Process damage
  for (i in match.players) {
    // Get players
    var currPlayer = match.players[i];
    var oppoPlayer = getOpponent(i);

    if(currPlayer.currHandIndex != -1) {
      var currCard = currPlayer.getCardInHand();
      if(currCard.cost > currPlayer.stamina) break;

      if (currCard.constructor === Attack) {
        oppoPlayer.receiveDamage(currCard.damage, currCard.target);
        //if(currCard.target == 'Head') {oppoPlayer.headLane.receiveDamage(currCard.damage)};
        //if(currCard.target == 'Body') {oppoPlayer.bodyLane.receiveDamage(currCard.damage)};
        //if(currCard.target == 'Legs') {oppoPlayer.legsLane.receiveDamage(currCard.damage)};
      }
    }
  }

  // Reset
  for (i in match.players) {
    var currPlayer = match.players[i];
    var oppoPlayer = getOpponent(i);
    if(currPlayer.currHandIndex != -1) {
      var currCard = currPlayer.getCardInHand();
      if(currCard.cost <= currPlayer.stamina) {
        updateCardMessage(oppoPlayer);
      }
    }
    currPlayer.reset();
  }
}

module.exports = resolution
