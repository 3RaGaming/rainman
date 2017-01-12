


var players = [];

function Player(id, xPos, yPos, colorObj) {
	this.id = id;
	this.x = xPos;
  this.y = yPos;
  this.color = colorObj;
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

function heartbeat(){
  io.sockets.emit('heartbeat', players);
}


io.sockets.on('connection', function(socket) {
	console.log('We have a new client: ' + socket.id);

	socket.on('start', function(data) {
		//console.log(socket.id + " " + data.x + " " + data.y + " " + data.r + " " +data.heading);
		var p = new Player(socket.id, data.x, data.y, generateRandomColor());
		players.push(p);
    console.log(players);
		//socket.broadcast.emit('mouse', data);
	});

    socket.on('update', function(data) {
        console.log(data); 
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
        }


  });

  socket.on('disconnect', function() {
    console.log("Client has disconnected");
    var indexToRemove;
    if (players.length == 1){
      players.pop();
    }else{
      for (var i = 0; i < players.length; i++) {
        if (socket.id == players[i].id) {
          indexToRemove = i;
        }
      }
      
      if (indexToRemove){
        players.splice(indexToRemove, 1);
      }
    }

    
    console.log(players);
  });

});



