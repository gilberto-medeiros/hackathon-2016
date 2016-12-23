class LaneLife {
  constructor(isLocalPlayer, headHealth, bodyHealth, legHealth) {
    this.isLocalPlayer = isLocalPlayer;

    this.setHeadHealth(headHealth);
    this.setBodyHealth(bodyHealth);
    this.setLegHealth(legHealth);



    this.node = this.createVisual();
  }

  setHeadHealth(newValue) {
    this.headHealth = newValue;
    if (this.headLabel != undefined) {
      var sprite = this.headLabel.getChildren()[0];
      sprite.x = this.headLabel.width*0.5;
      sprite.y = this.headLabel.height*0.5;
    }
  }

  setBodyHealth(newValue) {
    this.bodyHealth = newValue;
    if (this.bodyLabel != undefined) {
      var sprite = this.bodyLabel.getChildren()[0];
      sprite.x = this.bodyLabel.width*0.5;
      sprite.y = this.bodyLabel.height*0.5;
    }
  }

  setLegHealth(newValue) {
    this.legHealth = newValue;
    if (this.legLabel != undefined) {
      var sprite = this.legLabel.getChildren()[0];
      sprite.x = this.legLabel.width*0.5;
      sprite.y = this.legLabel.height*0.5;
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

    var blockLabel = cc.LabelTTF.create("0", "Arial", 26);
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
      body.scale = -1.5;
      leg.scale = -1.5;
    }
    return node;
  }

  addBlockDamage(lane, diff) {
    if (lane == "Head") {
      this.headLabel.blockLabel.text = parseInt(this.headLabel.blockLabel.text) - diff;
    } else if (lane == "Body") {
      this.bodyLabel.blockLabel.text = parseInt(this.bodyLabel.blockLabel.text) - diff;
    } else if (lane == "Legs") {
      this.legLabel.blockLabel.text = parseInt(this.legLabel.blockLabel.text) - diff;
    }
  }

  addHealthDamage(lane, diff) {
    if (lane == "Head") {
      this.setHeadHealth(this.headHealth + diff);
    } else if (lane == "Body") {
      this.setBodyHealth(this.bodyHealth + diff);
    } else if (lane == "Legs") {
      this.setLegHealth(this.legHealth + diff);
    }
  }
}
