class Player {
  constructor(deck, headHealth, bodyHealth, legHealth, stamina, playerId) {
    this.id = playerId;
    this.deck = deck;
    this.headHealth = headHealth;
    this.bodyHealth = bodyHealth;
    this.legHealth =  legHealth;
    this.stamina = stamina;
  }

  consumeCard(cardIndex) {
    this.deck.hand.splice(cardIndex, 1);
    addCardToHand()
  }

  addCardToHand() {
    while (this.deck.hand.lenght < 5) {
      this.deck.hand.push(this.deck.deckDefinition[Math.floor(Math.random() * this.deck.deckDefinition.length)])
    }
  }

  print() {
    console.log("awesome sdfwe " + this.legHealth);
  }
}

module.exports = Player;
