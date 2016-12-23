/**
 * Created by mario.salgado on 22/12/16.
 */
class Match {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.resolution = require('../shared/resolution');

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

    getPlayerByID(playerID) {
      for (var i in this.players) {
        if (this.players[i].id == playerID) {
          return this.players[i];
        }
      }
    }

    addActiveCard(playerID, handIndex) {
      this.getPlayerByID(playerID).currHandIndex = handIndex;
    }

    sendHandsToPlayers() {
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            player.socket.emit('event', {'setHand': player.deck.hand});

        }
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
                console.log(ref.resolution);
                ref.resolution(ref);
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
