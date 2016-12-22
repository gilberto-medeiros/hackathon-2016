class CardVisual {
  constructor(cardDef) {
    this.cardDef = cardDef;
  }

  createVisual(visualDefinition) {
    this.bg = cc.LayerColor.create(cc.color(0,200,0,255), 120, 200);
    gameScene.addChild(this.bg);
  }
}

function CreateHand(hand) {
  for (var handIndex in hand) {
    console.log('hand[' + handIndex + '] = ' + hand[handIndex]);
    var vis = new CardVisual(getCardDefById(hand[handIndex]))
    vis.createVisual();
  }
}
