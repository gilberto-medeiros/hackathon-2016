/**
 * Created by mario.salgado on 22/12/16.
 */
class Match {
    constructor(id) {
        this.id = id;
        this.players = new Array();
        this.activeCards = new Array();
    }

    addPlayer(player) {
        console.log('a player connected. id=' + player.id);
        //TODO: Change this to other place in the class.
        // process a disconnected
        player.socket.on('disconnect', function() {
            console.log('user disconnected');
            //socket.broadcast.emit('event', 'a user disconnected');
            player.socket.broadcast.emit('event', {txt : 'player ' + player.id + ' left'});
        });
        player.socket.on('play card', function(msg) {
            console.log('message '+ msg.handIndex);
        }
        this.players.push(player);
        return true;
    }

    addActiveCard(cardID) {
        this.activeCards[palyer.id] = cardID;
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

    start(){
        waitInterval = setInterval(wait, 3000, 1000);
        console.log('match is starting');
        io.emit('event', {txt : 'match ' + match.id + ' is starting'});
    }

    function wait() {
        clearInterval(waitInterval);
        setInterval(tick, 1000, 1000);
        match.sendHandsToPlayers();
    }
}

module.exports = Match;