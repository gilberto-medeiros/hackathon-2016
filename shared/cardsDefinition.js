
var fs = require("fs");

class CardsDefinition {

  constructor() {
    this.allCards = JSON.parse(fs.readFileSync("shared/cards.json"));
  }

  getRandomCardDefinition() {
    var index = Math.floor(Math.random() * this.allCards.cards.length);
    return this.allCards.cards[index];
  }

  getCardDefinition(id) {
    for (var cardIndex in this.allCards.cards) {
      if(this.allCards.cards[cardIndex].id == id) return this.allCards.cards[cardIndex];
    }
  }

}

module.exports = CardsDefinition;
