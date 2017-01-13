

//////////////////////////////////////////////////
// INITIALIZE

var gameSettings = {
  worldImage: null,
  worldWidth: 1600,
  worldHeight: 1200,
  maxPlayers: 32,
  clientWindowWidth: 800,
  clientWindowHeight: 600
};

//////////////////////////////////////////////////
var players = [];
var bullets = [];

function Bullet(bulletData) {
	this.x = bulletData.x;
  this.y = bulletData.y;
  this.direction = bulletData.direction;
}

function Player(id, positionObj, colorObj) {
	this.id = id;
	this.x = positionObj.x;
  this.y = positionObj.y;
  this.direction = 0;
  this.color = colorObj;
}

function generateRandomPosition(){
  var positionObj = {
    x: Math.floor((Math.random() * gameSettings.worldWidth) + 1),
    y: Math.floor((Math.random() * gameSettings.worldHeight) + 1)
  };
  return positionObj;
}

function generateRandomColor(){
  var colorObj = {
    r: Math.floor((Math.random() * 235) + 20),
    b: Math.floor((Math.random() * 235) + 20),
    g: Math.floor((Math.random() * 235) + 20)
  };
  return colorObj;
}

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My server is now running");

var socket = require('socket.io');

var io = socket(server);

setInterval(heartbeat, 16);
setInterval(printServerState, 5000);
function heartbeat(){
  var heartbeatData = {
    players: players,
    bullets: bullets
  };
  io.sockets.emit('heartbeat', heartbeatData);
}

function printServerState(){
  console.log('PLAYERS ' + players.length);
  for (var i = 0; i < players.length; i++){
    var p = players[i];
    console.log((i + 1) + ' > ' + p.id + '  |  x: ' + p.x + ' y: ' + p.y + '  |  RBG: ' + p.color.r + ' ' + p.color.b + ' ' + p.color.g);
  }

  console.log('BULLETS ' + bullets.length);
  for (var i = 0; i < bullets.length; i++){
    var b = bullets[i];
    console.log((i + 1) + ' > ' + b.id + '  |  x: ' + b.x + ' y: ' + b.y + '  |  ');
  }
  console.log('----------');
}

io.sockets.on('connection', function(socket) {
	console.log("CLIENT HAS CONNECTED  |  " + socket.id);

	socket.on('start', function(data) {
		var newPlayer = new Player(socket.id, generateRandomPosition(), generateRandomColor());
		players.push(newPlayer);
		//socket.broadcast.emit('mouse', data);
    socket.emit('initialize', gameSettings, newPlayer);
	});

  socket.on('addBullet', function(data){
    var newBullet = new Bullet(data);
    bullets.push(newBullet);
  });

  socket.on('updateBulletPosition', function(data){
    for (var i = 0; i < bullets.length; i++) {
      if (socket.id == bullets[i].id) {
        var bulletToUpdate = bullets[i];
        b.x = data.x;
        b.y = data.y;
        b.direction = data.direction;
        break;
      }
    }
  });

  socket.on('updatePlayerPosition', function(data) {
    for (var i = 0; i < players.length; i++) {
      if (socket.id == players[i].id) {
        var playerToUpdate = players[i];
        playerToUpdate.x = data.x;
        playerToUpdate.y = data.y;
        playerToUpdate.direction = data.direction;
        break;
      }
    }
  });

  socket.on('disconnect', function() {
    console.log("CLIENT HAS DISCONNECTED  |  " + socket.id);
    for (var i = 0; i < players.length; i++) {
      if (socket.id == players[i].id) {
        players.splice(i, 1);
        break;
      }
    }
  });

});



