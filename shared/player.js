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
  }

  pushMessageToClient(newMessage) {
    messageList.push(newMessage);
  }

  sendMessageList() {
    this.socket.emit('Turn Resolution', this.messageList);
    this.messageList = [];
    /*for (var i = 0; i < this.messageList.length; i++) {
      var message = this.messageList[i];
      this.socket.emit()
    }*/
  }
}

module.exports = Player;
