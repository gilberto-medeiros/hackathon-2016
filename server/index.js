var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var path = require("path");

var Player = require('../shared/player');
var CardsDefinition = require('../shared/cardsDefinition');

var public_host = 'http://localhost/public/cocos2d-js-v3.12/';

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



var playerid = 0;
http.listen(3000, function(){
  console.log('listening on *:3000');

});

// accept a connection
io.on('connection', function(socket){
  console.log('a user connected. id=' + playerid++);
  socket.broadcast.emit('event', {txt : 'a user connected'});
  //socket.broadcast.emit('event', 'a user connected');



  //var p = new Polygon(100, 200);
  //console.log('awesonme ' + p.height);
  var p = new Player(null, 0,0,0,0);
  p.print();

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
});

setInterval(tick, 100, 100);

function tick() {
  //console.log('tick');
}
