/**
 * Created by mario.salgado on 22/12/16.
 */
console.log('window is ' + window.location.origin);

// Send messages to server
var socket = io(window.location.origin + ":3000");
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

// get chat messages from server
socket.on('chat message', function(msg){
    console.log('text');
    $('#messages').append($('<li>').text("x:"+msg));
});

// get generic state events from server
socket.on('event', function(msg){
    console.log(msg);
    //var p = new Polygon(100, 200);

    console.log(msg);
    $('#messages').append($('<li><b>').text("w"+msg.txt));
});

var cardDefs;
$.getJSON('../shared/cards.json', function(response){
    cardDefs = response;
    console.log(cardDefs.cards[0].id);
});
