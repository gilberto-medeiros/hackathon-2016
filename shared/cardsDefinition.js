var fs = require("fs");
var Block = require("../shared/block");
var Attack = require("../shared/attack");
var Counter = require("../shared/counter");


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
      if(this.allCards.cards[cardIndex].id == id) return this.allCards.cards[cardIndex]
    }
  }

  createCard(cardDef){
    if(cardDef.type == 'Attack'){
        return new Attack(
            cardDef.id,
            cardDef.part,
            cardDef.name,
            cardDef.target,
            cardDef.power,
            cardDef.special,
            cardDef.cost
        );
    }else if(cardDef.type == 'Block'){
        return new Block(
            cardDef.id,
            cardDef.part,
            cardDef.name,
            cardDef.target,
            cardDef.power,
            cardDef.special,
            cardDef.cost
        );
    }else if(cardDef.type == 'Counter'){
        return new Counter(
            cardDef.id,
            cardDef.part,
            cardDef.name,
            cardDef.target,
            cardDef.power,
            cardDef.special,
            cardDef.cost
        );
    }else{
      console.log("Missing card with id " + id + ".");
    }
  }

}

module.exports = CardsDefinition;
