class Deck {
  constructor(deckDefinition) {
    this.definition = deckDefinition;
    this.hand = []
  }


  playCard(cardIndex) {
    var card = this.deck.hand[cardIndex];
    this.deck.hand.splice(cardIndex, 1);
    addCardToHand();
    return card;
  }

  addCardToHand() {
    while (this.deck.hand.lenght < 5) {
      this.deck.hand.push(this.definition.getRandomCardDefinition().id);
    }
  }

}

module.exports = Deck;
