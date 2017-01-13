
function Bullet(bulletSettings, gameSettings) {
  this.mapPosition = createVector(bulletSettings.x, bulletSettings.y);
  this.screenPosition = createVector(gameSettings.clientWindowWidth / 2, gameSettings.clientWindowHeight / 2);
  this.direction = bulletSettings.direction;
  this.isOpponent = false;
  this.attributes = {
    speed: 5,
    size: 20, // Examples for later
    damage: 10, // Examples for later
    critical: 10 // Examples for later
  };
  this.vel = p5.Vector.fromAngle(this.direction);
  this.vel.mult(10);

  this.update = function() {
    this.screenPosition.add(this.vel);
    this.mapPosition.add(this.vel);
  };
  
  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.screenPosition.x, this.screenPosition.y);

    pop();
  };

  this.hits = function(object) {
    var d = dist(this.mapPosition.x, this.mapPosition.y, object.mapPosition.x, object.mapPosition.y);
    if (d < 10) {
      return true;
    } else {
      return false;
    }
  };


  this.offscreen = function() {
    if (this.mapPosition.x > gameSettings.worldWidth || this.mapPosition.x < 0) {
      return true;
    }
    if (this.mapPosition.y > gameSettings.worldHeight || this.mapPosition.y < 0) {
      return true;
    }
    return false;
  };


}