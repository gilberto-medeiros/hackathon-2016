/**
 * Created by mario.salgado on 22/12/16.
 */
class Match {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.turn = 0;
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
        player.socket.on('next-turn', function(msg) {
            console.log('player '+ player.id + ' changed turn');
            ref.nextTurn();
        })
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

    nextTurn(){
        this.resolution(this);
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            player.tick();
            // send stamina update
            player.socket.emit('event', {'setStamina': player.stamina});
        }
        for (var playerIndex in this.players) {
            var player = this.players[playerIndex];
            //player.sendMessageList();
        }
    }

    start(){
        console.log('match is starting');
        var waitInterval;
        //var ref = this;
        this.sendHandsToPlayers();
        this.nextTurn();
        /*
        setInterval(function(){
            ref.nextTurn();
        }, 1000, 1000);
        */
    }
}

module.exports = Match;
