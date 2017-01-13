
var socket;
var player;
var world;
var players = [];
var player = null;
var bullets = [];
var targets = [];

var gameSettings;

function setup() {
  socket = io.connect('http://192.168.2.127:3000');
  socket.emit('start', null);

  socket.on('initialize', function(settings, newPlayer){
    gameSettings = settings;
  
    world = new World(gameSettings);
    player = new Player(newPlayer, gameSettings);

    for (var i = 1; i <= 5; i++){
      targets.push(new Target(
        {
          x: Math.floor((Math.random() * gameSettings.worldWidth) + 1),
          y: Math.floor((Math.random() * gameSettings.worldHeight) + 1)
        }, gameSettings
      ));
    }

    console.log(player);
    createCanvas(gameSettings.clientWindowWidth, gameSettings.clientWindowHeight);
  });
  
  socket.on('heartbeat', function(data) {
      players = data.players;
      //bullets = data.bullets;
  });

} // END OF SETUP FUNCTION

function draw() {
  background(0);

  
  if (world && player){
    world.renderAccordingToPlayer(player);

    /* Show Player Score */
    push();
    fill(255);
    text('SCORE: ' + player.score, 50, 50);
    pop();

    player.point(createVector(mouseX, mouseY));
    player.render(width, height);
    player.move();
    var data = {
      x: player.mapPosition.x,
      y: player.mapPosition.y,
      direction: player.direction
    };
    socket.emit('updatePlayerPosition', data);

    for (var i = 0; i < players.length; i++) {
      if (players[i].id !== socket.id) {
        var opponent = new Player(players[i], gameSettings);
        opponent.isOpponent = true;
        opponent.render(opponent.calculateDistanceToObject(player));
        opponent = null;
      }
    } 

    for (var i = 0; i < targets.length; i++) {
      var distanceObj = player.calculateDistanceToObject(targets[i]);
      targets[i].render(distanceObj);
    }

    for (var i = bullets.length - 1; i >= 0; i--){
      bullets[i].render();
      bullets[i].update();

      for (var j = 0; j < targets.length; j++){
        if (bullets[i].hits(targets[j])){
          bullets.splice(i, 1);
          targets.splice(j, 1);
          player.score++;
        }
      }

      if (bullets[i].offscreen()){
        bullets.splice(i, 1);
      }

      /*
      var bulletData = {
        x: bullet.mapPosition.x,
        y: bullet.mapPosition.y,
        direction: bullet.direction
      };
      */
      //socket.emit('updateBullet', bulletData);
    }
  }

}

function mouseClicked() {
  var bulletData = {
    x: player.mapPosition.x,
    y: player.mapPosition.y,
    direction: player.direction - (PI / 2)
  };
  var newBullet = new Bullet(bulletData, gameSettings);
  bullets.push(newBullet);
  //socket.emit('addBullet', bulletData);
} 

