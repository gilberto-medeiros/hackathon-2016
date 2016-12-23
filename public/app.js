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

$('#next-turn').submit(function(){
    socket.emit('next-turn', {'playerid':playerid});
});

// get chat messages from server
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text("x:"+msg));
});

function processSingleEvent(msg) {
    if ('disconnect' in msg) {
        console.log(msg);
        this.endGame();
    }
  if ('txt' in msg) {
    console.log(msg);
    $('#messages').append($('<li>').text(msg.txt));
  }

  if ('setId' in msg) {
    $('#messages').append($('<li>').text('my id is ' + msg.setId));
    playerid = msg.setId;
  }

  if ('setStamina' in msg) {
    staminaBar.width = staminaBarUnitScreenWidth*msg.setStamina;
  }

  if ('setHand' in msg) {
    $('#messages').append($('<li>').text('hand ' + msg.setHand));
    CreateHand(msg.setHand);
    localPlayer = new PlayerVisual(true);
    remotePlayer = new PlayerVisual(false);
  }

  if ('playCard' in msg) {
    console.log('play card ' + msg.playCard);
    PlayCard(msg.playCard);
  }

  if ('opponentPlayCard' in msg) {
    OpponentPlayCard(msg.opponentPlayCard);
  }

  if ('addCard' in msg) {
    //$('#messages').append($('<li>').text('hand ' + msg.setHand));
    SpawnCard(msg.addCard, 4);
  }
}

// get generic state events from server
socket.on('event', function(msg){
  if( msg.constructor === Array ) {
    for (var i = 0; i < msg.length; i++) {
      processSingleEvent(msg[i]);
    }
  }
  else {
    processSingleEvent(msg);
  }

});

var cardDefs;
function getCardDefById(cardId) {
  for (var cardIndex in cardDefs.cards) {
    if(cardDefs.cards[cardIndex].id == cardId) return cardDefs.cards[cardIndex];
  }
}

function ready(){
    socket.emit('ready', {'playerid':playerid});
}

function endGame(){
    //TODO: Do something
}

function addResourcesFromCards(resources) {
  //var res = [];
  for (var cardIndex in cardDefs.cards) {
    var def = cardDefs.cards[cardIndex];
    if (def.art != "") {
      resources.push(def.art);
    }
  }
  return resources;
}

$.getJSON('../shared/cards.json', function(response){
    cardDefs = response;

    var resources = ["art/Interface__0000s_0002_Fighters.png",
                    "art/card__0009_Shadow.png",
                    "art/Interface__0000s_0000_Number.png",
                    "art/Interface__0000s_0001_Down-Interface.png",];
    resources = addResourcesFromCards(resources);

    //load resources
    cc.LoaderScene.preload(resources, function () {
        MyScene = cc.Scene.extend({
            onEnter:function () {
                this._super();

                var size = cc.director.getWinSize();
                var sprite = cc.Sprite.create("art/Interface__0000s_0002_Fighters.png");
                sprite.setPosition(size.width / 2, size.height / 2);
                this.addChild(sprite, -10);

                staminaBar = cc.LayerColor.create(cc.color(0,0,255,255), staminaBarUnitScreenWidth, 30);
                staminaBar.x = 15;
                staminaBar.y = 250;

                var staminaBarBG = cc.LayerColor.create(cc.color(100,100,100,200), staminaBarUnitScreenWidth*10 + 10, staminaBar.height + 10);
                staminaBarBG.x = staminaBar.x - 5;
                staminaBarBG.y = staminaBar.y - 5

                this.addChild(staminaBarBG, 1);
                this.addChild(staminaBar, 2);

                var shadow = new cc.Sprite("art/Interface__0000s_0001_Down-Interface.png");
                shadow.ignoreAnchor = true;
                this.addChild(shadow,-9);
            }
        });
        gameScene = new MyScene();
        cc.director.runScene(gameScene);
        ready();
    }, this);
});
