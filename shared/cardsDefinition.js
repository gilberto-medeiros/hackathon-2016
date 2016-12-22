
var fs = require("fs");

class CardsDefinition {

  constructor() {
    this.allCards = JSON.parse(fs.readFileSync("shared/cards.json"));
  }

  getRandomCardDefinition() {
    var index = Math.floor(Math.random() * this.allCards.cards.length);
    return this.allCards.cards[index];
  }

  getRandomCardDefinition(id) {
    for (var o in this.allCards.cards) {
      if(o.id == id) return o
    }
  }

}

module.exports = CardsDefinition;
