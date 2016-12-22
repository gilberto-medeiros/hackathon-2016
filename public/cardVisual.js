class CardVisual {
  constructor(cardDef) {
    this.cardDef = cardDef;
  }

  createVisual() {
    this.bg = cc.LayerColor.create(cc.color(0,200,0,255), 120, 200);
    var label = cc.LabelTTF.create(this.cardDef.name, "Arial", 16);
    label.anchorX = 0;
    label.x = 5;
    label.y = this.bg.height - 20;
    this.bg.addChild(label);
    gameScene.addChild(this.bg);
    return this.bg;
  }


}

function CreateHand(hand) {
  var offset = 0;
  for (var handIndex in hand) {
    console.log('hand[' + handIndex + '] = ' + hand[handIndex]);
    var vis = new CardVisual(getCardDefById(hand[handIndex]))
    var root = vis.createVisual();
    root.x = 80 + offset;
    root.y = 50;
    offset += 150;
  }
}
