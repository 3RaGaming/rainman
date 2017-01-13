// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM


var socket;
var player;
var world;
var players = [];
var player = null;

var worldWidth;
var worldHeight;

function setup() {
  

  socket = io.connect('http://192.168.2.127:3000');
  socket.emit('start', null);

  socket.on('initialize', function(data){
    worldWidth = data.worldWidth;
    worldHeight = data.worldHeight;
    world = new World(worldWidth, worldHeight);
    createCanvas(800, 600);
  });
  
  socket.on('heartbeat',
    function(data) {
      console.log(data);
      players = data;

    }
  );
}

function draw() {
  background(0);
  //alert(players);

  if (world){
    world.render();
    /*
    if (player){
      world.renderAccordingToPlayer(player);
    }else{
      world.render();
    }
    */
  }
  for (var i = 0; i < players.length; i++) {
    console.log(players[i]);
    var id = players[i].id;
    if (id !== socket.id) {
      var p = new Player(players[i].x, players[i].y, players[i].color);
      p.setDirection(players[i].direction);
      

      if (player){
        var distanceObj = p.calculateDistance(player);
        p.renderOpponent(distanceObj);
      }else{
        p.renderOpponent();
      }
      /*
      push();
      translate()
      fill(players[i].color.r, players[i].color.g, players[i].color.b);
      
      ellipse(players[i].x, players[i].y, 50, 50);

      fill(255);
      textAlign(CENTER);
      textSize(20);
      text(players[i].id, players[i].x, players[i].y);

      pop();
      */
    }else{
      
      if (!player){
        player = new Player(players[i].x, players[i].y, players[i].color);
        player.point(createVector(mouseX, mouseY));
        player.render(width, height);
        
        player.move();
        var data = {
          x: player.mapPosition.x,
          y: player.mapPosition.y,
          direction: player.direction
        };
        socket.emit('update', data);
      }else{
        player.point(createVector(mouseX, mouseY));
        player.render(width, height);
        player.move();
        var data = {
          x: player.mapPosition.x,
          y: player.mapPosition.y,
          direction: player.direction
        };
        socket.emit('update', data);
      }
    }
  }
}

function mouseClicked() {
  player.grow();
}  
