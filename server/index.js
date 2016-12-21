var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var public_host = 'http://localhost/public/cocos2d-js-v3.12/'

/*app.get('/', function(req, res){
  res.redirect(public_host + 'HelloWorld.html');
});

app.get('/*js$/', function(req, res){
  var path = public_host + req.params[0] + 'js';
  console.log('path is ' + path);
  res.send(path);
})*/

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

var playerid = 0;
http.listen(3000, function(){
  console.log('listening on *:3000');

});

io.on('connection', function(socket){
  console.log('a user connected. id=' + playerid++);
  //socket.broadcast.emit('event', {txt : 'a user connected'});
  socket.broadcast.emit('event', 'a user connected');

  var p = new Polygon(100, 200);

  console.log('awesonme ' + p.height);

  socket.on('disconnect', function() {
    console.log('user disconnected');
    socket.broadcast.emit('event', 'a user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log('message '+ msg);
    io.emit('chat message', msg);
  });
});

setInterval(tick, 100, 100);

function tick() {
  //console.log('tick');
}
