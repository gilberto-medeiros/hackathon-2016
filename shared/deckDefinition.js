var Deck = require('../shared/deck');

class DeckDefinition {
  constructor(name, cardsDefinition) {
    this.name = name;
    this.cardsDefinition = cardsDefinition;
  }

  createDeck() {
    var deck = new Deck(this);
    return deck;
  }
}

module.exports = DeckDefinition;
