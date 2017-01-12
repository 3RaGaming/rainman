// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM


var socket;
var player;

var players = [];
var player = null;
function setup() {
  createCanvas(500, 500);

  socket = io.connect('http://192.168.2.127:3000');

  var data = {
	  x: 50,
	  y: 50,
  };
  
  socket.emit('start', data);
  
  
  socket.on('heartbeat',
    function(data) {
      console.log(data);
      players = data;

    }
  );
  
  //player = new player(50, 50);
}

function draw() {
  background(0);
  //alert(players);
  for (var i = 0; i < players.length; i++) {
    console.log(players[i]);
    var id = players[i].id;
    if (id !== socket.id) {
      fill(players[i].color.r, players[i].color.r, players[i].color.b);
      
      ellipse(players[i].x, players[i].y, 50, 50);

      fill(255);
      textAlign(CENTER);
      textSize(20);
      text(players[i].id, players[i].x, players[i].y);
    }else{
      /*
      if (!player){
        player = new player(players[i].x, players[i].y, players[i].color);
        player.render();
      }else{
        player.render();
      }
      */
      ellipse(100, 100, 50, 50);
      /*
      if (!player){
        player = new player(player[i]);
      }else{
        console.log('player exists');
      }
      */
      
      //player = players[i];
    }
  }
  /*
  if (player != null){

    player.render();
    player.move();

    var data = {
      x: player.x,
      y: player.y,
    };

    socket.emit('update', data);
  }
  */
}

 function mouseClicked() {
  }  
