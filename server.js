


var ships = [];

function Player() {
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
	
}

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My server is now running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection',

function(socket) {
	
	console.log('We have a new client: ' + socket.id);
	

	socket.on('start',
		function(data) {
			
			
		//console.log(socket.id + " " + data.x + " " + data.y + " " + data.r + " " +data.heading);
		var ship = new Ship(socket.id, data.pos, data.r, data.heading);
		ships.push(ship);
		//socket.broadcast.emit('mouse', data);
	}
   );

   socket.on('update',
      function(data) {
        //console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
        var ship;
        for (var i = 0; i < ships.length; i++) {
          if (socket.id == ships[i].id) {
            ship = ships[i];
          }
        }
        ship.pos = data.pos;
        ship.r = data.r;
		ship.heading = data.heading;
      }
    );

	socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });

   }
);



