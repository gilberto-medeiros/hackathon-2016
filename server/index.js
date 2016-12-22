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

var playerId = 1;
var matchId = 1;
var match = new Match(matchId);
var matches = [];

// accept a connection
io.on('connection', function(socket){
    if (match.isMatchFull()) {
        matches[matchId] = match;
        match = new Match(++matchId);
    }

    var player = new Player(deckDefinition.createDeck(), 0,0,0,0, playerId++,matchId);

    player.socket = socket;

    socket.emit('event', {txt : 'you connected with id ' + player.id, 'setId': player.id});

    // recieve chat messages from a client
    socket.on('chat message', function(msg) {
      console.log('message '+ msg);
      io.emit('chat message', msg);
    });

    // process a disconnected
    socket.on('disconnect', function() {
        console.log('user disconnected');
        //socket.broadcast.emit('event', 'a user disconnected');
        socket.broadcast.emit('event', {txt : 'player ' + player.id + ' left'});
    });

    socket.on('play card', function(msg) {
        console.log('message '+ msg);
    });

    match.addPlayer(player);

    if (match.isMatchFull()) {
        waitInterval = setInterval(wait, 3000, 1000);
        console.log('match is starting');
        io.emit('event', {txt : 'match ' + match.id + ' is starting'});
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
