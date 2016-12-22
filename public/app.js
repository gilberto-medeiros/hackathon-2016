/**
 * Created by mario.salgado on 22/12/16.
 */

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
    if ('txt' in msg) {
      console.log(msg);
      $('#messages').append($('<li>').text(msg.txt));
    }

    if ('setId' in msg) {
      $('#messages').append($('<li>').text('my id is ' + msg.setId));
    }

    if ('setStamina' in msg) {
      $('#messages').append($('<li>').text('stamina ' + msg.setStamina));
    }
});

var cardDefs;
$.getJSON('../shared/cards.json', function(response){
    cardDefs = response;
    console.log(cardDefs.cards[0].id);
});
