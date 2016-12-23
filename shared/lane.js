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
        player.pushMessageToClient(lane + ' lane received ' + damage + ' block damage');
      }else{
        var dif = Math.abs(this.block - damage);
        this.block = 0;
        this.health -= dif;
        player.pushMessageToClient(lane + ' lane received ' + damage + ' health damage');
      }
    }else{
      this.health -= damage;
    }
  }

  stackBlock(block) {
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
