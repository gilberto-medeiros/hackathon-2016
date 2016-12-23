class PlayerVisual {
  constructor(isLocalPlayer, stamina, headHealth, bodyHealth, legHealth) {
    this.isLocalPlayer = isLocalPlayer;
    this.setStamina(stamina);
    this.setHeadHealth(headHealth);
    this.setBodyHealth(bodyHealth);
    this.setlegHealth(legHealth);

    this.createVisual();
  }

  setStamina(newStamina) {
    this.stamina = newStamina;
  }

  setHeadHealth(newValue) {
    this.headHealth = newValue;
  }
  setBodyHealth(newValue) {
    this.bodyHealth = newValue;
  }
  setlegHealth(newValue) {
    this.legHealth = newValue;
  }

  createVisual() {
    this.bg = cc.LayerColor.create(cc.color(100,100,100,20), 400, 500);
    this.bg.ignoreAnchor = false;
    this.bg.anchorX = 0;
    this.bg.anchorY = 1;
    this.bg.y = 760;
    if (this.isLocalPlayer) {
      this.bg.x = 10;
    }
    else {
      var size = cc.director.getWinSize();
      this.bg.x = size.width - 10;
      this.bg.scaleX = -0.8;
      this.bg.scaleY = -this.bg.scaleX;
    }
    gameScene.addChild(this.bg);

    this.createHeadLane();
    this.createBodyLane();
    this.createLegLane();
  }

  createGenericLane() {
    var padding = 10;
    var lane = cc.LayerColor.create(cc.color(100,100,100,20), this.bg.width - padding*2, this.bg.height * 0.3);
    lane.ignoreAnchor = false;
    lane.anchorX = 0;
    lane.anchorY = 0.5;
    lane.x = padding;
    this.bg.addChild(lane);

    var label = cc.LabelTTF.create("generic lane", "Arial", 16);
    if (!this.isLocalPlayer) {
      label.scaleX = -1;
    }
    label.anchorX = 0.5;
    label.anchorY = 0.5;
    lane.addChild(label);
    lane.setLaneName = function(newName) {
      label.string = newName;
      label.x = 5 + label.width*0.5;
      label.y = lane.height * 0.9 + 5 - label.height*0.5;
    };
    lane.setLaneValue = function(newName) {
      label.string = newName;
    };

    return lane;
  }

  createHeadLane() {
    var genericLane = this.createGenericLane();
    genericLane.setLaneName("Head");
    genericLane.y = this.bg.height * 0.975 - genericLane.height*0.5;
  }

  createBodyLane() {
    var genericLane = this.createGenericLane();
    genericLane.setLaneName("Body");
    genericLane.y = this.bg.height * 0.65 - genericLane.height*0.5;
  }

  createLegLane() {
    var genericLane = this.createGenericLane();
    genericLane.setLaneName("Lane");
    genericLane.y = this.bg.height * 0.325 - genericLane.height*0.5;
  }

}
