class CardsDefinition {

  constructor(
    this.allCards = JSON.parse(fs.readFileSync("shared/cards.json"));
  )

}

module.exports = CardsDefinition;
