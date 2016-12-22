handVisuals = [];

class CardVisual {
  constructor(cardDef, handIndex) {
    this.cardDef = cardDef;
    this.handIndex = handIndex;

  }

  createVisual() {
    this.bg = cc.LayerColor.create(cc.color(0,200,0,255), 120, 200);
    this.bg.anchorX = 0.5;
    this.bg.anchorY = 0;
    var label = cc.LabelTTF.create(this.cardDef.name, "Arial", 16);
    label.anchorX = 0;
    label.x = 5;
    label.y = this.bg.height - 20;
    this.bg.addChild(label);
    gameScene.addChild(this.bg);

    var menu = cc.Menu.create();
    var size = cc.director.getWinSize();
    menu.x -= size.width/2;
    menu.y -= size.height/2;
    this.bg.addChild(menu, 3);
    this.menuItem = cc.MenuItem.create(
                function(val){
                    socket.emit('play card', {'playerid':playerid, 'handIndex':this.handIndex});
                    HighlightCard(this.handIndex);
                },
              this);
    menu.addChild(this.menuItem);
    this.menuItem.width = this.bg.width;
    this.menuItem.height = this.bg.height;
    this.menuItem.anchorX = 0;
    this.menuItem.anchorY = 0;

    return this.bg;
  }

  setHighlight(highlight) {
    if (highlight) {
      this.bg.scale = 1.1;
    }
    else {
      this.bg.scale = 1.0;
    }
  }
}

function CreateHand(hand) {
  var offset = 0;
  for (var handIndex in hand) {
    console.log('hand[' + handIndex + '] = ' + hand[handIndex]);
    var vis = new CardVisual(getCardDefById(hand[handIndex]), handIndex);
    var root = vis.createVisual();
    root.x = 80 + offset;
    root.y = 50;
    offset += 150;
    handVisuals.push(vis);
  }
}

function HighlightCard (visualIndex) {
  for (var index in handVisuals) {
    var visual = handVisuals[index];
    if (index == visualIndex) {
      visual.setHighlight(true);
    } else {
      visual.setHighlight(false);
    }
  }
}
