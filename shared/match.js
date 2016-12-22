/**
 * Created by mario.salgado on 22/12/16.
 */
class Match {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.activeCards = [];
    }

    addPlayer(player) {
        var ref = this;
        console.log('a player connected. id=' + player.id);
        //TODO: Change this to other place in the class.
        // process a disconnected
        player.socket.on('disconnect', function() {
            console.log('user disconnected');
            //socket.broadcast.emit('event', 'a user disconnected');
            player.socket.broadcast.emit('event', {txt : 'player ' + player.id + ' left'});
        });
        player.socket.on('play card', function(msg) {
            console.log('card '+ msg.handIndex + ' from player ' + msg.playerid);

            ref.addActiveCard(msg.playerid, msg.handIndex)
        });
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

    start(){
        var waitInterval;
        var ref = this;
        waitInterval = setInterval(function(){
            clearInterval(waitInterval);
            setInterval(function(){
                //console.log(ref.players);
                for (var playerIndex in ref.players) {
                    var player = ref.players[playerIndex];
                    player.tick();
                    // send stamina update
                    player.socket.emit('event', {'setStamina': player.stamina});
                }
            }, 1000, 1000);
            ref.sendHandsToPlayers();

        }, 3000, 3000);
        console.log('match is starting');
        //io.emit('event', {txt : 'match ' + match.id + ' is starting'});
    }
}

module.exports = Match;
