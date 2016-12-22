class Player {
  constructor(deck, headHealth, bodyHealth, legHealth, stamina) {
    this.deck = deck;
    this.headHealth = headHealth;
    this.bodyHealth = bodyHealth;
    this.legHealth =  legHealth;
    this.stamina = stamina
  }

  print() {
    console.log("awesome sdfwe " + this.legHealth);
  }
}

module.exports = Player;
