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

    if (staminaBar.value > msg.setStamina) {
      var staminaEffect = cc.LayerColor.create(cc.color(255,255,255,100), staminaBarUnitScreenWidth*(staminaBar.value-msg.setStamina), staminaBar.height);
      staminaEffect.x = staminaBar.x + msg.setStamina*staminaBarUnitScreenWidth;
      staminaEffect.y = staminaBar.y;
      staminaBar.parent.addChild(staminaEffect, staminaBar.zOrder);
      staminaEffect.runAction(new cc.Sequence(//[new cc.ScaleTo(0.5, 0, 1),
                                        [new cc.Spawn([new cc.ScaleTo(0.3, 1, 0), cc.moveBy(0.3, cc.p(0, -20))]),
                                      new cc.RemoveSelf(true)]));
    }

    staminaBar.value = msg.setStamina;
    staminaBar.width = staminaBarUnitScreenWidth*msg.setStamina;
  }
  if ('setOpponentStamina' in msg) {
    remoteStaminaBar.width = -remoteSstaminaBarUnitScreenWidth*msg.setOpponentStamina;
  }

  if ('setHand' in msg) {
    $('#messages').append($('<li>').text('hand ' + msg.setHand));
    CreateHand(msg.setHand.hand);
    localPlayer = new PlayerVisual(true, msg.setHand.head, msg.setHand.body, msg.setHand.legs);
    remotePlayer = new PlayerVisual(false, msg.setHand.head, msg.setHand.body, msg.setHand.legs);
  }

  if ('playCard' in msg) {
    PlayCard(msg.playCard);
  }

  if ('opponentPlayCard' in msg) {
    OpponentPlayCard(msg.opponentPlayCard);
  }

  if ('addCard' in msg) {
    //$('#messages').append($('<li>').text('hand ' + msg.setHand));
    SpawnCard(msg.addCard, 4);
  }

  if ('rejectCard' in msg) {
    //$('#messages').append($('<li>').text('hand ' + msg.setHand));
    HighlightCard(-1);
  }

    if ('blockDamage' in msg) {
        if (msg.blockDamage.localPlayer) {
          localPlayer.laneLife.addBlockDamage(msg.blockDamage.lane, msg.blockDamage.value);
        }
        else {
          remotePlayer.laneLife.addBlockDamage(msg.blockDamage.lane, msg.blockDamage.value);
        }
    }

    if ('healthDamage' in msg) {
      if (msg.healthDamage.localPlayer) {
        localPlayer.laneLife.addHealthDamage(msg.healthDamage.lane, msg.healthDamage.value);
      }
      else {
        remotePlayer.laneLife.addHealthDamage(msg.healthDamage.lane, msg.healthDamage.value);
      }
    }

    if ('stackBlock' in msg) {
      if (msg.stackBlock.localPlayer) {
        localPlayer.laneLife.addBlockDamage(msg.stackBlock.lane, -msg.stackBlock.value);
      }
      else {
        remotePlayer.laneLife.addBlockDamage(msg.stackBlock.lane, -msg.stackBlock.value);
      }
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

function createStaminaBar(ref, unitWidth, height) {
  var sb = cc.LayerColor.create(cc.color(0,0,255,255), unitWidth, height);
  sb.x = 15;
  sb.y = 250;

  sb.value = 10;
  var staminaBarBG = cc.LayerColor.create(cc.color(100,100,100,200), unitWidth*sb.value + 10, -(sb.height + 10));
  staminaBarBG.x = sb.x - 5;
  staminaBarBG.y = sb.y + sb.height + 5;
  sb.bg = staminaBarBG;

  ref.addChild(staminaBarBG, -1);
  ref.addChild(sb, 2);
  return sb;
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

                // local stamina
                staminaBar = createStaminaBar(this, staminaBarUnitScreenWidth, 30);

                // remote stamina
                remoteStaminaBar = createStaminaBar(this, remoteSstaminaBarUnitScreenWidth, 15);
                remoteStaminaBar.x = size.width - staminaBar.x;
                //remoteStaminaBar.y = size.height - 200;
                remoteStaminaBar.bg.width = -remoteStaminaBar.bg.width;
                remoteStaminaBar.bg.x = remoteStaminaBar.x + 5;
                remoteStaminaBar.bg.y = remoteStaminaBar.y + remoteStaminaBar.height + 5;

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
