

//////////////////////////////////////////////////
// INITIALIZE

var world = {
  worldImage: null,
  worldWidth: 1600,
  worldHeight: 1200,
  maxPlayers: 32
};

//////////////////////////////////////////////////
var players = [];



function Player(id, positionObj, colorObj) {
	this.id = id;
	this.x = positionObj.x;
  this.y = positionObj.y;
  this.direction = 0;
  this.color = colorObj;
}

function generateRandomPosition(){
  var positionObj = {
    x: Math.floor((Math.random() * world.worldWidth) + 1),
    y: Math.floor((Math.random() * world.worldHeight) + 1)
  };
  console.log(positionObj);
  return positionObj;
}

function generateRandomColor(){
  var colorObj = {
    r: Math.floor((Math.random() * 235) + 20),
    b: Math.floor((Math.random() * 235) + 20),
    g: Math.floor((Math.random() * 235) + 20)
  };
  console.log(colorObj);
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
  io.sockets.emit('heartbeat', players);
}

function printServerState(){
  console.log('-- PLAYERS --');
  for (var i = 0; i < players.length; i++){
    var p = players[i];
    console.log(p.id + '  |  x: ' + p.x + ' y: ' + p.y + '  |  RBG: ' + p.color.r + ' ' + p.color.b + ' ' + p.color.g);
  }
  console.log('\n');
}

io.sockets.on('connection', function(socket) {
	console.log('We have a new client: ' + socket.id);

	socket.on('start', function(data) {
		//console.log(socket.id + " " + data.x + " " + data.y + " " + data.r + " " +data.heading);
    var p = new Player(socket.id, generateRandomPosition(), generateRandomColor());
		players.push(p);
    //console.log(players);
		//socket.broadcast.emit('mouse', data);
    io.sockets.emit('initialize', world);
	});

    socket.on('update', function(data) {
        //console.log(data); 
        //console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
        var p;
        for (var i = 0; i < players.length; i++) {
          if (socket.id == players[i].id) {
            p = players[i];
          }
        }

        if (p){
          p.x = data.x;
          p.y = data.y;
          p.direction = data.direction;
        }


  });

  socket.on('disconnect', function() {
    console.log("Client has disconnected");

    for (var i = 0; i < players.length; i++) {
      if (socket.id == players[i].id) {
        players.splice(i, 1);
        break;
      }
    } 

  });

});



