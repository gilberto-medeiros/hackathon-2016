var Attack = require('../shared/attack')
var Block = require('../shared/block')
var Counter = require('../shared/counter')

var resolution = function(match) {



  // Pre process
  for (i in match.players) {
    // Get players
    var currPlayer = match.players[i];
    var oppoPlayer = match.getOpponent(i);

    if(currPlayer.currHandIndex != -1) {
      var currCard = currPlayer.getCardInHand();

      if(currCard.cost > currPlayer.stamina) {
        continue;
      }


      // Pre Process Blocks
      //if (currCard.constructor === Block) {
      if (currCard.isBlock) {
        currPlayer.stackBlock(currCard.power, currCard.target, oppoPlayer);
        //if(currCard.target == 'Head') {currPlayer.headLane.stackBlock(currCard.damage)};
        //if(currCard.target == 'Body') {currPlayer.bodyLane.stackBlock(currCard.damage)};
        //if(currCard.target == 'Legs') {currPlayer.legsLane.stackBlock(currCard.damage)};
      }

      // Pre Process attack
      //if (currCard.constructor === Attack) {
      if (currCard.isAttack) {
        currPlayer.setUnblockable();
      }

      if (currCard.isCounter) {
        currPlayer.setUnblockable();
        oppoPlayer.setAttackWillBeCountered();
      }
    }
  }

  // Process damage
  for (i in match.players) {
    // Get players
    var currPlayer = match.players[i];
    var oppoPlayer = match.getOpponent(i);

    if(currPlayer.currHandIndex != -1) {
      var currCard = currPlayer.getCardInHand();
      currPlayer.consumeCard = currCard.cost <= currPlayer.stamina;
      if(!currPlayer.consumeCard) {
        console.log('Ignoring card with cost ' + currCard.cost + ' for ' + currPlayer.stamina + ' stamina ' );
        continue;
      }

      // Process stamina
      staminaCost = currCard.cost;
      currPlayer.addStamina(-staminaCost);

      //if (currCard.constructor === Attack) {
      if (currCard.isAttack && (!currPlayer.attackWillBeCountered) || currCard.isCounter) {
        oppoPlayer.receiveDamage(currCard.power, currCard.target, currPlayer);
        //if(currCard.target == 'Head') {oppoPlayer.headLane.receiveDamage(currCard.damage)};
        //if(currCard.target == 'Body') {oppoPlayer.bodyLane.receiveDamage(currCard.damage)};
        //if(currCard.target == 'Legs') {oppoPlayer.legsLane.receiveDamage(currCard.damage)};
      }
    }
  }

  // Reset
  for (i in match.players) {
    var currPlayer = match.players[i];
    var oppoPlayer = match.getOpponent(i);
    if(currPlayer.currHandIndex != -1) {
      //var currCard = currPlayer.getCardInHand();
      if(currPlayer.consumeCard) {
        currPlayer.updateCardMessage(oppoPlayer);
      }
      else {
        currPlayer.pushMessageToClient({'rejectCard':currPlayer.currHandIndex});
      }
    }
    currPlayer.reset();
  }
}

module.exports = resolution
