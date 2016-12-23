class Deck {

  constructor(deckDefinition) {
    this.definition = deckDefinition;
    this.hand = new Array();
    this.addCardToHand();
  }

  getCardInHand(cardIndex) {
    var cardID = this.hand[cardIndex];
    //console.log('cardID ' + cardID);
    var cardDef = this.definition.cardsDefinition.getCardDefinition(cardID);
    //console.log('cardDef ' + cardDef);
    return this.definition.cardsDefinition.createCard(cardDef)
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
    //console.log(this.hand)
  }

}

module.exports = Deck;
