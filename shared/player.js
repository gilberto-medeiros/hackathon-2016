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
    }

    print() {
        console.log("awesome sdfwe " + this.legHealth);
    }

    addStamina(stamina) {
        this.stamina += stamina;
        if (this.stamina > 10) {
            this.stamina = 10;
        }
    }

    getCardInHand() {
        return this.deck.getCardInHand(this.currHandIndex);
    }

    tick() {
        this.addStamina(3+this.headLane.getBonus());
        this.pushMessageToClient({'setStamina': this.stamina});
    }

    pushMessageToClient(newMessage) {
        this.messageList.push(newMessage);
    }

  sendMessageList() {
    console.log("player " + this.id + " will get messages ");
    console.log(this.messageList);
    this.socket.emit('event', this.messageList);
    this.messageList = [];
  }
    receiveDamage(lane, damage){
        switch(lane) {
            case 'Head':
                this.headLane.receiveDamage(damage, this, lane);
                break;
            case 'Body':
                this.bodyLane.receiveDamage(damage, this, lane);
                break;
            case 'Legs':
                this.legsLane.receiveDamage(damage, this, lane);
                break;
        }
    }

    stackBlock(lane, block){
        switch(lane) {
            case 'Head':
                this.headLane.stackBlock(block, this, lane);
                break;
            case 'Body':
                this.bodyLane.stackBlock(block, this, lane);
                break;
            case 'Legs':
                this.legsLane.stackBlock(block, this, lane);
                break;
        }
    }

    setUnblockable(){
        this.headLane.setBlockable(false);
        this.bodyLane.setBlockable(false);
        this.legsLane.setBlockable(false);
    }

    reset(){
        this.headLane.setBlockable(true);
        this.bodyLane.setBlockable(true);
        this.legsLane.setBlockable(true);

        this.currHandIndex = -1;
    }

    updateCardMessage(oppoPlayer) {
        oppoPlayer.pushMessageToClient({'opponentPlayCard': this.getCardInHand(this.currHandIndex).id});
        this.pushMessageToClient({'playCard': this.currHandIndex,
            'addCard': this.deck.playCard()});
    }
}

module.exports = Player;
