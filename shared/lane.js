class Lane {

  constructor() {
    this.baseHealth = 10
    this.health = 10;
  }

  receiveDamage(damage) {
    this.health -= damage;
  }

  getBonus() {
    return Math.round(this.health / 5) - 2;
  }

}

module.exports = Lane;
