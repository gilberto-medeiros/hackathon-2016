var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

var Match = require('../shared/match');
var Player = require('../shared/player');
var CardsDefinition = require('../shared/cardsDefinition');
var DeckDefinition = require('../shared/deckDefinition');

var public_host = 'http://localhost/public/cocos2d-js-v3.12/';
var cardsDefinition = new CardsDefinition();
var deckDefinition =  new DeckDefinition('all-cards', cardsDefinition);

http.listen(3000, function(){
  console.log('listening on *:3000');

});

var playerid = 0;
var match = new Match;
// accept a connection
io.on('connection', function(socket){
  var p = new Player(deckDefinition.createDeck(), 0,0,0,0, playerid++);
  if (match.addPlayer(p)) {
    p.socket = socket;
    //console.log('a user connected. id=' + playerid++);
    socket.emit('event', {txt : 'you connected with id ' + p.id, 'setId': p.id});
    //socket.broadcast.emit('event', {txt : 'you connected with id ' + p.id});

    // process a disconnected
    socket.on('disconnect', function() {
      console.log('user disconnected');
      //socket.broadcast.emit('event', 'a user disconnected');
      socket.broadcast.emit('event', {txt : 'DISCONNECT'});
    });

    // recieve chat messages from a client
    socket.on('chat message', function(msg) {
      console.log('message '+ msg);
      io.emit('chat message', msg);
    });

    socket.on('play card', function(msg) {
      //console.log('playerid: ' + msg.playerid + ' - cardidx: ' + msg.handIndex);
      match.addActiveCard(msg.playerid, msg.handIndex)
    });

    if (match.isMatchFull()) {
      waitInterval = setInterval(wait, 3000, 1000);
      console.log('match is starting');
      io.emit('event', {txt : 'match is starting'});
    }
  }
  else {

  }
});

function wait() {
  clearInterval(waitInterval);
  setInterval(tick, 1000, 1000);
  match.sendHandsToPlayers();
}

function tick(delta) {
  match.tick();
}
