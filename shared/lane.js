class Lane {

  constructor(health) {
    this.baseHealth = health;
    this.health = health;
    this.block = 0;
    this.isBlockable = true;
  }

  inflictTrueDamage(damage) {
    if (damage > this.health) {
      var dif = this.health;
      this.health = 0;
      return dif;
    }
    else {
      this.health -= damage;
      return damage;
    }
  }

  receiveDamage(damage, player, lane, oppoPlayer) {
    if(this.isBlockable){
      if(this.block - damage >= 0){
        this.block -= damage;
        player.pushMessageToClient({'blockDamage': {'lane': lane , 'value': damage, 'localPlayer': true}});
        oppoPlayer.pushMessageToClient({'blockDamage': {'lane': lane , 'value': damage, 'localPlayer': false}});
      }else{
        var dif = Math.abs(this.block - damage);
        if (this.block > 0) {
          player.pushMessageToClient({'blockDamage': {'lane': lane , 'value': this.block, 'localPlayer': true}});
          oppoPlayer.pushMessageToClient({'blockDamage': {'lane': lane , 'value': this.block, 'localPlayer': false}});
        }
        this.block = 0;
        //this.health -= dif;
        var realDif = this.inflictTrueDamage(dif);
          player.pushMessageToClient({'healthDamage': {'lane': lane , 'value': realDif, 'localPlayer': true}});
          oppoPlayer.pushMessageToClient({'healthDamage': {'lane': lane , 'value': realDif, 'localPlayer': false}});
      }
    }else{
      //this.health -= damage;
      var realDif = this.inflictTrueDamage(damage);
        player.pushMessageToClient({'healthDamage': {'lane': lane , 'value': realDif, 'localPlayer': true}});
        oppoPlayer.pushMessageToClient({'healthDamage': {'lane': lane , 'value': realDif, 'localPlayer': false}});
    }

  }

  stackBlock(block, player, lane, oppoPlayer) {
    player.pushMessageToClient({'stackBlock': {'lane': lane , 'value': block, 'localPlayer': true}});
    oppoPlayer.pushMessageToClient({'stackBlock': {'lane': lane , 'value': block, 'localPlayer': false}});
    this.block += block;
  }

  setBlockable(boolean){
    this.isBlockable = boolean;
  }

  getBonus() {
    return Math.round(this.health / 5) - 2;
  }

}

module.exports = Lane;
