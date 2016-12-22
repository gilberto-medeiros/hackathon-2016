var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var path = require("path");

var Player = require('../shared/player');

var public_host = 'http://localhost/public/cocos2d-js-v3.12/'

var content = fs.readFileSync("shared/cards.json");
var json = JSON.parse(content);


console.log("asodqswe " + json.cards[0].id);

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

  isMatchFull() {
    return this.players.length == 2;
  }
}

var playerid = 0;
var match = new Match;
// accept a connection
io.on('connection', function(socket){
  var p = new Player(null, 0,0,0,0, playerid++);
  if (match.addPlayer(p)) {
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
      setInterval(tick, 100, 100);
      console.log('match is starting');
      io.emit('event', {txt : 'match is starting'});
    }
  }
  else {

  }
});

setInterval(tick, 100, 100);

function tick() {
  //console.log('tick');
}
