class LaneLife {
  positionBlockLabel(label, bar) {
    label.removeFromParentAndCleanup(false);
    label.x = bar.barBG._contentSize.width + 15;
    label.y = 8;
    bar.addChild(label);
  }

  constructor(isLocalPlayer, headHealth, bodyHealth, legHealth) {
    this.isLocalPlayer = isLocalPlayer;

    this.setHeadHealth(headHealth);
    this.setBodyHealth(bodyHealth);
    this.setLegHealth(legHealth);

    this.node = this.createVisual();

    this.headBar = new Bar(250/headHealth, headHealth, 20, headHealth);
    this.bodyBar = new Bar(250/bodyHealth, bodyHealth, 20, bodyHealth);
    this.legBar = new Bar(250/legHealth, legHealth, 20, legHealth);

    gameScene.addChild(this.headBar);
    gameScene.addChild(this.bodyBar);
    gameScene.addChild(this.legBar);

    this.positionBlockLabel(this.headLabel.blockLabel, this.headBar);
    this.positionBlockLabel(this.bodyLabel.blockLabel, this.bodyBar);
    this.positionBlockLabel(this.legLabel.blockLabel, this.legBar);

    if (this.isLocalPlayer) {
      this.headBar.x = this.bodyBar.x = this.legBar.x = 50;
      this.headBar.bar.color = this.bodyBar.bar.color = this.legBar.bar.color = cc.color(255, 60, 0, 0);
    }
    else {
      this.headBar.x = this.bodyBar.x = this.legBar.x = cc.director.getWinSize().width - 50;
      this.headBar.scaleX = this.bodyBar.scaleX = this.legBar.scaleX = this.headLabel.blockLabel.scaleX = this.bodyLabel.blockLabel.scaleX = this.legLabel.blockLabel.scaleX = -1;
      //this.headBar.bar.color = this.bodyBar.bar.color = this.legBar.bar.color = cc.color(255, 220, 190, 0);
      this.headBar.bar.color = this.bodyBar.bar.color = this.legBar.bar.color = cc.color(150, 100, 50, 0);
    }

    this.headBar.y = 600;
    this.bodyBar.y = 450;
    this.legBar.y = 300;
  }

  setHeadHealth(newValue) {
    this.headHealth = newValue;
    if (this.headLabel != undefined) {
      this.headLabel.string = newValue;
      var sprite = this.headLabel.getChildren()[0];
      sprite.x = this.headLabel.width*0.5;
      sprite.y = this.headLabel.height*0.5;
    }

    if (this.headBar != undefined) {
      this.headBar.setProgress(newValue);
    }
  }

  setBodyHealth(newValue) {
    this.bodyHealth = newValue;
    if (this.bodyLabel != undefined) {
      this.bodyLabel.string = newValue;
      var sprite = this.bodyLabel.getChildren()[0];
      sprite.x = this.bodyLabel.width*0.5;
      sprite.y = this.bodyLabel.height*0.5;
    }

    if (this.bodyBar != undefined) {
      this.bodyBar.setProgress(newValue);
    }
  }

  setLegHealth(newValue) {
    this.legHealth = newValue;
    if (this.legLabel != undefined) {
      this.legLabel.string = newValue;
      var sprite = this.legLabel.getChildren()[0];
      sprite.x = this.legLabel.width*0.5;
      sprite.y = this.legLabel.height*0.5;
    }

    if (this.legBar != undefined) {
      this.legBar.setProgress(newValue);
    }
  }

  createHealthNode(health, parent) {
    var sprite = cc.Sprite.create("art/Interface__0000s_0000_Number.png");
    //sprite.position =

    var label = cc.LabelTTF.create(health, "Arial", 26);
    label.anchorX = 0.5;
    label.anchorY = 0.5;
    label.addChild(sprite, -1);
    parent.addChild(label);

    var blockLabel = cc.LabelTTF.create("0", "Arial", 32);
    blockLabel.enableStroke(cc.color(0,0,0,255), 3);
    label.addChild(blockLabel);
    label.blockLabel = blockLabel;

    return label;
  }

  createVisual() {
    var node = cc.Node.create();
    gameScene.addChild(node, -5);
    this.headLabel = this.createHealthNode(this.headHealth, node);
    this.setHeadHealth(this.headHealth);
    this.headLabel.x = 120;
    this.headLabel.y = 200;

    this.bodyLabel = this.createHealthNode(this.bodyHealth, node);
    this.setBodyHealth(this.bodyHealth);
    this.bodyLabel.x = this.headLabel.x;
    this.bodyLabel.y = 120;

    this.legLabel = this.createHealthNode(this.legHealth, node);
    this.setLegHealth(this.legHealth);
    this.legLabel.x = this.headLabel.x;
    this.legLabel.y = 40;

    var head = this.headLabel;
    var body = this.bodyLabel;
    var leg = this.legLabel;
    node.reduce = function() {
      node.scale = -0.4;
      head.scale = -1.5;
      var y = head.y;
      head.y = leg.y;
      leg.y = y;
      body.scale = -1.5;
      leg.scale = -1.5;
    }
    return node;
  }

  highlightTextNode(node) {
    node.runAction(new cc.Sequence([new cc.ScaleBy(0.15, 2),
                                      new cc.ScaleBy(0.15, 0.5),
                                      new cc.ScaleBy(0.15, 2),
                                      new cc.ScaleBy(0.15, 0.5)]));
  }

  isBlockAvailable(blockLabel) {
    var value = parseInt(blockLabel.string);
    return value > 0;
  }

  addBlockDamage(lane, diff) {
    if (lane == "Head") {
      this.headLabel.blockLabel.string = parseInt(this.headLabel.blockLabel.string) - diff;
      this.highlightTextNode(this.headLabel.blockLabel);
      if (this.isBlockAvailable(this.headLabel.blockLabel)) {
        this.headBar.barBG.setZOrder(3);
      }
      else {
        this.headBar.barBG.setZOrder(1);
      }
    } else if (lane == "Body") {
      this.bodyLabel.blockLabel.string = parseInt(this.bodyLabel.blockLabel.string) - diff;
      this.highlightTextNode(this.bodyLabel.blockLabel);
      if (this.isBlockAvailable(this.bodyLabel.blockLabel)) {
        this.bodyBar.barBG.setZOrder(3);
      }
      else {
        this.bodyBar.barBG.setZOrder(1);
      }
    } else if (lane == "Legs") {
      this.legLabel.blockLabel.string = parseInt(this.legLabel.blockLabel.string) - diff;
      this.highlightTextNode(this.legLabel.blockLabel);
      if (this.isBlockAvailable(this.legLabel.blockLabel)) {
        this.legBar.barBG.setZOrder(3);
      }
      else {
        this.legBar.barBG.setZOrder(1);
      }
    }
  }

  addHealthDamage(lane, diff) {
    if (lane === "Head") {
      this.setHeadHealth(this.headHealth - diff);
      this.highlightTextNode(this.headLabel);
    } else if (lane === "Body") {
      this.setBodyHealth(this.bodyHealth - diff);
      this.highlightTextNode(this.bodyLabel);
    } else if (lane === "Legs") {
      this.setLegHealth(this.legHealth - diff);
      this.highlightTextNode(this.legLabel);
    }
  }
}
