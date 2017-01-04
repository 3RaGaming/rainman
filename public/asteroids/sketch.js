// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM


var socket;
var player;

var players = [];

function setup() {
  createCanvas(500, 500);
  
  socket = io.connect('http://192.168.2.127:3000');
  
  
  
  player = new player(50, 50);
   
  var data = {
	  x: player.x,
	  y: player.y,
  };
  
  socket.emit('start', data);
  
  
  socket.on('heartbeat',
    function(data) {
      //console.log(data);
      players = data;
    }
  );
  
}

function draw() {
  background(0);

  for (var i = players.length - 1; i >= 0; i--) {
    var id = players[i].id;
    if (id.substring(2, id.length) !== socket.id) {
      fill(0, 0, 255);
      ellipse(players[i].x, players[i].y, 50, 50);

      fill(255);
      textAlign(CENTER);
      textSize(3);
      text(players[i].id, players[i].x, players[i].y + players[i].r);
    }
  
  player.render();
  player.move();

}

 function mouseClicked() {
  }  
