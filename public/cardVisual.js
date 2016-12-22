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
    gameScene.addChild(this.bg);

    // create the card name
    var label = cc.LabelTTF.create(this.cardDef.name, "Arial", 16);
    label.anchorX = 0;
    label.x = 5;
    label.y = this.bg.height - 20;
    this.bg.addChild(label);


    // create the menu
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

    // cost
    this.cost = new CardCost(this.cardDef, this);

    this.createCardSpecifics();

    return this.bg;
  }

  setHighlight(highlight) {
    this.bg.stopAllActions();
    if (highlight) {
      this.bg.scale = 1.0;
      this.bg.runAction(new cc.ScaleTo(0.2, 1.1));
    }
    else {
      this.bg.runAction(new cc.ScaleTo(0.1, 1));
    }
  }

  createCardSpecifics() {
    // check KO

    this.createTypeLabel(this.cardDef.type);
    if (this.cardDef.type == "Attack") {
      this.createAttackVisuals();
    }
    else if (this.cardDef.type == "Block") {
      this.createBlockVisuals();
    }
    else if (this.cardDef.type == "Counter") {
      this.createAttackVisuals();
      this.createCounterVisuals();
    } else {
      console.log("########### unrecognised card type" + this.cardDef.type);
    }
  }

  createTypeLabel(type) {
    var label = cc.LabelTTF.create(type, "Arial", 14);
    label.color = cc.color(220,220,0,255);
    label.anchorX = 0;
    label.anchorY = 0;
    label.x = 5;
    label.y = 5;
    this.bg.addChild(label);
  }

  createAttackVisuals() {
    var label = cc.LabelTTF.create(this.cardDef.power, "Arial", 26);
    label.color = cc.color(220,0,0,255);
    label.anchorX = 1;
    label.anchorY = 0;
    label.x = this.bg.width - 5;
    label.y = 3;
    this.bg.addChild(label);
    return label;
  }

  createBlockVisuals() {
    var label = this.createAttackVisuals();
    label.color = cc.color(220,200,200,255);
  }

  createCounterVisuals() {

  }
}

function CreateHand(hand) {
  var offset = 0;
  for (var handIndex in hand) {
    //console.log('hand[' + handIndex + '] = ' + hand[handIndex]);
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

function playCard(index) {

}


class CardCost {
  constructor(cardDef, visual) {
    this.cardDef = cardDef;
    this.visual = visual;

    this.createVisual();
  }

  createVisual() {
    var x = /*this.visual.bg.width - */10;
    var y = this.visual.bg.height - 40;
    for (var i = 0; i < this.cardDef.cost; i++) {
      var dot = cc.LayerColor.create(cc.color(0,0,200,255), 5, 5);
      dot.x = x;
      dot.y = y;
      this.visual.bg.addChild(dot);
      y -= dot.height + 3;
    }
  }
}
