/**
 * Created by mario.salgado on 22/12/16.
 */
class Card {

    constructor(id, part, name, target, power, special, cost, isAttack, isBlock, isCounter) {
        //console.log('Creating Card');
        this.id = id;
        this.part = part;
        this.name = name;
        this.target = target;
        this.power = power;
        this.special = special;
        this.cost = cost;
        this.isAttack = isAttack;
        this.isBlock = isBlock;
        this.isCounter = isCounter;
    }
}

module.exports = Card;
