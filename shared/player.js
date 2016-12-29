var HeadLane = require('../shared/headLane');
var BodyLane = require('../shared/bodyLane');
var LegsLane = require('../shared/legsLane');


class Player {
    constructor(deck, headHealth, bodyHealth, legHealth, stamina, playerId, matchId) {
        this.id = playerId;
        this.matchId = matchId;
        this.deck = deck;
        this.headHealth = headHealth;
        this.bodyHealth = bodyHealth;
        this.legHealth =  legHealth;
        this.stamina = stamina;
        this.headLane = new HeadLane();
        this.bodyLane = new BodyLane();
        this.legsLane = new LegsLane();
        this.currHandIndex = -1;
        this.messageList = [];
        this.attackWillBeCountered = false;
    }

    print() {
        console.log("awesome sdfwe " + this.legHealth);
    }

    addStamina(stamina) {
        this.stamina += stamina;
    }

    getCardInHand() {
        return this.deck.getCardInHand(this.currHandIndex);
    }

    tick() {
        this.addStamina(3+this.headLane.getBonus());
    }

    pushMessageToClient(newMessage) {
        this.messageList.push(newMessage);
    }

    getStamina() {
      if (this.stamina > 10) {
          return 10;
      }
      if (this.stamina < 0) {
          return 0;
      }
      return this.stamina;
    }

    sendMessageList() {
      this.stamina = this.getStamina();
        this.pushMessageToClient({'setStamina': this.getStamina()});
        this.pushMessageToClient({'setOpponentStamina': this.match.getOpponent(this.matchIndex).getStamina()});
        console.log("player " + this.id + " will get messages ");
        console.log(this.messageList);
        this.socket.emit('event', this.messageList);
        this.messageList = [];
    }

    receiveDamage(damage, lane, oppoPlayer){
      console.log("damage " + damage);
        switch(lane) {
            case 'Head':
                this.headLane.receiveDamage(damage, this, lane, oppoPlayer);
                break;
            case 'Body':
                this.bodyLane.receiveDamage(damage, this, lane, oppoPlayer);
                break;
            case 'Legs':
                this.legsLane.receiveDamage(damage, this, lane, oppoPlayer);
                break;
        }
    }

    stackBlock(block, lane, oppoPlayer){
      //console.log("damage block " + block);
        switch(lane) {
            case 'Head':
                this.headLane.stackBlock(block, this, lane, oppoPlayer);
                break;
            case 'Body':
                this.bodyLane.stackBlock(block, this, lane, oppoPlayer);
                break;
            case 'Legs':
                this.legsLane.stackBlock(block, this, lane, oppoPlayer);
                break;
        }
    }

    setUnblockable(){
        this.headLane.setBlockable(false);
        this.bodyLane.setBlockable(false);
        this.legsLane.setBlockable(false);
    }

    setAttackWillBeCountered() {
      this.attackWillBeCountered = true;
    }

    reset(){
        this.headLane.setBlockable(true);
        this.bodyLane.setBlockable(true);
        this.legsLane.setBlockable(true);
        this.attackWillBeCountered = false;
        this.currHandIndex = -1;
    }

    updateCardMessage(oppoPlayer) {
        oppoPlayer.pushMessageToClient({'opponentPlayCard': this.getCardInHand(this.currHandIndex).id});
        this.pushMessageToClient({'playCard': this.currHandIndex});
        this.deck.playCard(this.currHandIndex);
        this.pushMessageToClient({'addCard': this.deck.getCardInHand(4).id});
    }

    printStats() {
      console.log("player idx " + this.matchIndex + " id=" + this.id);
      console.log("head " + this.headLane.health + " Blk->" + this.headLane.block);
      console.log("body " + this.bodyLane.health + " Blk->" + this.bodyLane.block);
      console.log("legs " + this.legsLane.health + " Blk->" + this.legsLane.block);
    }
}

module.exports = Player;
