// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM


var socket;


var ship;

var ships = [];
var asteroids = [];
var lasers = [];

function setup() {
  createCanvas(1200, 600);
  
  socket = io.connect('http://localhost:3000');
  
  
  
  ship = new Ship(height / 2, width / 2, 20);
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
  
  var data = {
	  x: ship.pos.x,
	  y: ship.pos.y,
	  r: ship.r
  };
  
  socket.emit('start', data);
  
  
  
}

function draw() {
  background(0);
  
   for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('ooops!');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  translate(width/2-ship.pos.x, height/2-ship.pos.y)

  
  ship.render();
  ship.turn();
  ship.move();

}

 function mouseClicked() {
    //lasers.push(new Laser(ship.pos, ship.heading));
  }  
