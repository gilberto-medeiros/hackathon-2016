/**
 * Created by mario.salgado on 22/12/16.
 */
class Match {
    constructor() {
        this.players = new Array();
        this.activeCards = new Array();
    }

    addPlayer(player) {
        if(player.length == 2) {
            console.log("###### IGNORING PLAYER");
            return false;
        }
        console.log('a player connected. id=' + player.id);
        this.players.push(player);
        return true;
    }

    addActiveCard(playerID, handIndex) {
        this.activeCards[playerID] = handIndex;
    }

    sendHandsToPlayers() {
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            player.socket.emit('event', {'setHand': player.deck.hand});

        }
    }

    resolution() {

    }

    isMatchFull() {
        return this.players.length == 2;
    }

    tick() {
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            player.tick();

            // send stamina update
            player.socket.emit('event', {'setStamina': player.stamina});
        }
    }
}

module.exports = Match;
