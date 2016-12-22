class DeckDefinition {
  constructor() {

  }
}

class Deck {
  constructor(deckDefinition) {
    this.definition = deckDefinition;
    this.hand = new Array()
  }
}
