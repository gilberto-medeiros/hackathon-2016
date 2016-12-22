class CardVisual {
  constructor(cardDef, handIndex) {
    this.cardDef = cardDef;
    this.handIndex = handIndex;
  }

  createVisual() {
    this.bg = cc.LayerColor.create(cc.color(0,200,0,255), 120, 200);
    var label = cc.LabelTTF.create(this.cardDef.name, "Arial", 16);
    label.anchorX = 0;
    label.x = 5;
    label.y = this.bg.height - 20;
    this.bg.addChild(label);
    gameScene.addChild(this.bg);

    this.menuItem = cc.MenuItem.create(
                function(val){
                    console.log('clicked ' + this.cardDef.name);
                    socket.emit('play card', {'playerid':playerid, 'handIndex':this.handIndex});
                },
              this);
    menu.addChild(this.menuItem);
    this.menuItem.width = this.bg.width;
    this.menuItem.height = this.bg.height;
    this.menuItem.x = this.bg.x;
    this.menuItem.y = this.bg.y;
    this.menuItem.anchorX = 0;
    this.menuItem.anchorY = 0;

    return this.bg;
  }

  setPos(x, y) {
    this.bg.x = x;
    this.bg.y = y;
    this.menuItem.x = this.bg.x;
    this.menuItem.y = this.bg.y;
  }


}

function CreateHand(hand) {
  var offset = 0;
  for (var handIndex in hand) {
    console.log('hand[' + handIndex + '] = ' + hand[handIndex]);
    var vis = new CardVisual(getCardDefById(hand[handIndex]), handIndex);
    var root = vis.createVisual();
    vis.setPos(80 + offset, 50)
    //root.x = 80 + offset;
    //root.y = 50;
    offset += 150;
  }
}
