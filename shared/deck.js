class Deck {

  constructor(deckDefinition) {
    this.definition = deckDefinition;
    this.hand = new Array();
    this.addCardToHand();
  }

  playCard(cardIndex) {
    var cardID = this.hand.splice(cardIndex, 1);
    this.addCardToHand();
    return cardID;
  }

  addCardToHand() {
    while (this.hand.length == undefined || this.hand.length < 5) {
      var cardID = this.definition.cardsDefinition.getRandomCardDefinition().id;
      this.hand.push(cardID);
    }
    console.log(this.hand)
  }

}

module.exports = Deck;
