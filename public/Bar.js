/*class CardVisual {
  constructor(parent, unitSize, maxUnits, height, initialProgress) {



    var sb = cc.LayerColor.create(cc.color(0,0,255,255), this.unitSize, this.height);
    sb.x = 15;
    sb.y = 250;

    sb.value = 10;
    var staminaBarBG = cc.LayerColor.create(cc.color(100,100,100,200), unitWidth*sb.value + 10, -(sb.height + 10));
    staminaBarBG.x = sb.x - 5;
    staminaBarBG.y = sb.y + sb.height + 5;
    sb.bg = staminaBarBG;

    this.
    this.parent.addChild(staminaBarBG, -1);
    .addChild(sb, 2);

  }
}*/

Bar = cc.Node.extend({
    _className: "Bar",
    ctor: function (unitSize, maxUnits, height, initialProgress) {
      cc.Node.prototype.ctor.call(this);
      this.unitSize = unitSize;
      this.maxUnits = maxUnits;
      this.height = height;
      this.value = initialProgress;

      var sb = cc.LayerColor.create(cc.color(0,0,255,255), this.unitSize*this.value, this.height);
      var bg = cc.LayerColor.create(cc.color(100,100,100,200), this.unitSize*this.maxUnits + 10, (this.height + 10));
      bg.x = - 5;
      bg.y = -5;
      this.addChild(bg);
      this.addChild(sb);
      this.bar = sb;
    },
    /*setPositionX: function(x){
      cc.Node.prototype.setPositionX.call(this, x);
    },
    setPositionY: function(y){
      cc.Node.prototype.setPositionX.call(this, y);
    },*/
    setProgress: function(newValue){
      var oldValue = this.value;
      this.value = newValue;
      this.bar.width = this.unitSize*this.value;

      if (oldValue > newValue) {
        var staminaEffect = cc.LayerColor.create(cc.color(255,255,255,100), this.unitSize*(oldValue-newValue), this.height);
        staminaEffect.x = newValue*this.unitSize;
        //staminaEffect.y = this.sb.y;
        this.addChild(staminaEffect, this.bar.zOrder);
        staminaEffect.runAction(new cc.Sequence(//[new cc.ScaleTo(0.5, 0, 1),
                                          [new cc.Spawn([new cc.ScaleTo(0.3, 1, 0), cc.moveBy(0.3, cc.p(0, -20))]),
                                        new cc.RemoveSelf(true)]));
      }
    }
});
