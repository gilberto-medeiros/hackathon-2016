class Lane {

  constructor() {
    this.baseHealth = 10
    this.health = 10;
    this.block = 0;
    this.isBlockable = true;
  }

  receiveDamage(damage, player, lane) {
    if(this.isBlockable){
      if(this.block - damage >= 0){
        this.block -= damage;
        player.pushMessageToClient({'blockDamage': {'lane': lane , 'value': damage}});
      }else{
        var dif = Math.abs(this.block - damage);
          player.pushMessageToClient({'blockDamage': {'lane': lane , 'value': block}});
        this.block = 0;
        this.health -= dif;
          player.pushMessageToClient({'healthDamage': {'lane': lane , 'value': dif}});
      }
    }else{
      this.health -= damage;
        player.pushMessageToClient({'healthDamage': {'lane': lane , 'value': damage}});
    }
  }

  stackBlock(block, player, lane) {
    player.pushMessageToClient({'stackBlock': {'lane': lane , 'value': block}});
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
