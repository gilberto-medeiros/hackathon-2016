/**
 * Created by mario.salgado on 22/12/16.
 */

 var playerid;
 var localPlayer;
 var remotePlayer;
// Send messages to server
var socket = io(window.location.origin + ":3000");
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

$('#ready').submit(function(){
    socket.emit('ready', {'playerid':playerid});
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
      playerid = msg.setId;
    }

    if ('setStamina' in msg) {
      //$('#messages').append($('<li>').text('stamina ' + msg.setStamina));
      staminaBar.width = staminaBarUnitScreenWidth*msg.setStamina;
    }

    if ('setHand' in msg) {
      $('#messages').append($('<li>').text('hand ' + msg.setHand));
      CreateHand(msg.setHand);
      localPlayer = new PlayerVisual(true, 1, 10, 10, 10);
      remotePlayer = new PlayerVisual(false, 1, 10, 10, 10);
    }
});

var cardDefs;
function getCardDefById(cardId) {
  for (var cardIndex in cardDefs.cards) {
    if(cardDefs.cards[cardIndex].id == cardId) return cardDefs.cards[cardIndex];
  }
}
$.getJSON('../shared/cards.json', function(response){
    cardDefs = response;
    console.log(cardDefs.cards[0].id);
});
