var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

var Player = require('../shared/player');
var CardsDefinition = require('../shared/cardsDefinition');
var DeckDefinition = require('../shared/deckDefinition');

var public_host = 'http://localhost/public/cocos2d-js-v3.12/';
var cardsDefinition = new CardsDefinition();
var deckDefinition =  new DeckDefinition('all-cards', cardsDefinition);


/*
//var $ = require('jQuery');
//var jsdom = require('jsdom').jsdom;
var cardDefs;
$.getJSON('cards.json', function(response){
      cardDefs = response;
      console.log(cardDefs.cards[0].id);
});*/


/*app.get('/', function(req, res){
  res.redirect(public_host + 'HelloWorld.html');
});

app.get('/*js$/', function(req, res){
  var path = public_host + req.params[0] + 'js';
  console.log('path is ' + path);
  res.send(path);
})*/

http.listen(3000, function(){
  console.log('listening on *:3000');

});

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

  addActiveCard(cardID) {
    this.activeCards[palyer.id] = cardID;
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

    if (match.isMatchFull()) {
      setInterval(tick, 1000, 1000);
      console.log('match is starting');
      io.emit('event', {txt : 'match is starting'});
    }
  }
  else {

  }
});

function tick(delta) {
  match.tick();
}
