// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM


var socket;
var player;


function setup() {
  createCanvas(500, 500);
  
  socket = io.connect('http://localhost:3000');
  
  
  
  player = new player(50, 50);
   
  var data = {
	  x: player.x,
	  y: player.y,
  };
  
  socket.emit('start', data);
  
  
  
}

function draw() {
  background(0);

  
  player.render();
  player.move();

}

 function mouseClicked() {
  }  
