
function Player(playerSettings, gameSettings) {
  this.id = playerSettings.id;
  this.mapPosition = createVector(playerSettings.x, playerSettings.y);
  this.screenPosition = createVector(gameSettings.clientWindowWidth / 2, gameSettings.clientWindowHeight / 2);
  this.direction = playerSettings.direction;
  this.isOpponent = false;
  this.score = 0;
  this.attributes = {
    color: playerSettings.color,
    speed: 5,
    size: 20, // Examples for later
    attack: 10, // Examples for later
    defense: 10 // Examples for later
  };


  this.render = function(distanceObj) {
    push();

    // Translate the opponents according to distance from main player
    if (this.isOpponent && distanceObj){
      translate(this.screenPosition.x + distanceObj.x, this.screenPosition.y + distanceObj.y);
    }else{
      translate(this.screenPosition.x, this.screenPosition.y);
    }

    rotate(this.direction);
    noFill();
    stroke(this.attributes.color.r, this.attributes.color.g, this.attributes.color.b);
    strokeWeight(1);
    var txt = 'MAP POSITION \n X: ' + this.mapPosition.x + ' Y: ' + this.mapPosition.y;
    text(txt, 20, 0);
    triangle(0, -this.attributes.size, this.attributes.size, this.attributes.size, -this.attributes.size, this.attributes.size);
    
    pop();
  };

  this.point = function(mousePosition){
    this.direction = atan2(mousePosition.y - this.screenPosition.y, mousePosition.x - this.screenPosition.x) + (PI / 2);
  }

  this.shoot = function(){
    alert('SHOOT WEAPON!');
  };

  this.move = function() {
    // LEFT
    if (keyIsDown(65)){
      this.mapPosition.x -= 1 * this.attributes.speed;
    }
    // RIGHT
    if (keyIsDown(68)){
      this.mapPosition.x += 1 * this.attributes.speed;
    }
    // UP
    if (keyIsDown(87)){
      this.mapPosition.y -= 1 * this.attributes.speed;
    }
    // DOWN
    if (keyIsDown(83)){
      this.mapPosition.y += 1 * this.attributes.speed;
    }

    this.mapPosition.x = constrain(this.mapPosition.x, 0, gameSettings.worldWidth);
    this.mapPosition.y = constrain(this.mapPosition.y, 0, gameSettings.worldHeight);
    
  };

  this.calculateDistanceToObject = function(object){
    var distanceObj = {
      x: this.mapPosition.x - object.mapPosition.x,
      y: this.mapPosition.y - object.mapPosition.y,
      distance: dist(this.mapPosition.x, this.mapPosition.y, object.mapPosition.x, object.mapPosition.y)
    }
    return distanceObj;
  }
}