class Deck {

  constructor(deckDefinition) {
    //console.log('Creating Deck');
    this.definition = deckDefinition;
    this.hand = new Array();
    this.addCardToHand();


  }

  playCard(cardIndex) {
    var card = this.deck.hand[cardIndex];
    this.deck.hand.splice(cardIndex, 1);
    addCardToHand();
    return card;
  }

  addCardToHand() {
    console.log('Adding cards to hand.');
    console.log(this.hand);
    while (this.hand.length == undefined || this.hand.lenght < 5) {
      var cardID = this.definition.getRandomCardDefinition().id;
      console.log('Added ' + cardID);
      this.hand.push(cardID);
    }
  }

}

module.exports = Deck;
