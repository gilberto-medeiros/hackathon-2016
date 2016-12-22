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


    socket.on('play card', function(msg) {
      //console.log('playerid: ' + msg.playerid + ' - cardidx: ' + msg.handIndex);
      match.addActiveCard(msg.playerid, msg.handIndex)
    });

    match.addPlayer(player);


    if (match.isMatchFull()) {
        match.start();
    }
});
