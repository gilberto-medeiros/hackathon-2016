/**
 * Created by mario.salgado on 22/12/16.
 */
class Match {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.activeCards = [];
        this.resolution = require('../shared/resolution');

    }

    addPlayer(player) {
        var ref = this;
        player.isReady = false;
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
        player.socket.on('ready', function(msg) {
            console.log('player '+ player.id + ' is ready!');
            ref.notifyAllPlayers('player '+ player.id + ' is ready!')
            player.isReady = true;
            if(ref.isMatchFull() && ref.allReady()){
                ref.start();
            }
        });
        this.players.push(player);
        return true;
    }

    addActiveCard(playerID, handIndex) {
        this.activeCards[playerID] = handIndex;
    }

    notifyAllPlayers(msg) {
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            player.socket.emit('event', msg);
        }
    }

    sendHandsToPlayers() {
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            player.socket.emit('event', {'setHand': player.deck.hand});
        }
    }

    allReady(){
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            if(!player.isReady){
                return false;
            }
        }
        return true;
    }

    isMatchFull() {
        return this.players.length == 2;
    }

    start(){
        console.log('match is starting');
        var waitInterval;
        var ref = this;
        setInterval(function(){
            //console.log(ref.players);
            ref.resolution(ref);
            for (var playerIndex in ref.players) {
                var player = ref.players[playerIndex];
                player.tick();
                // send stamina update
                player.socket.emit('event', {'setStamina': player.stamina});
            }
            for (var playerIndex in ref.players) {
                var player = ref.players[playerIndex];
                //player.sendMessageList();
            }
        }, 1000, 1000);
        ref.sendHandsToPlayers();
        //io.emit('event', {txt : 'match ' + match.id + ' is starting'});
    }
}

module.exports = Match;
