var HeadLane = require('../shared/headLane');
var BodyLane = require('../shared/bodyLane');
var LegsLane = require('../shared/legsLane');


class Player {
  constructor(deck, headHealth, bodyHealth, legHealth, stamina, playerId) {
    this.id = playerId;
    this.deck = deck;
    this.headHealth = headHealth;
    this.bodyHealth = bodyHealth;
    this.legHealth =  legHealth;
    this.stamina = stamina;
    this.headLane = new HeadLane();
    this.bodyLane = new BodyLane();
    this.legsLane = new LegsLane();
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

  tick() {
    this.addStamina(1);
  }
}

module.exports = Player;
