// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function Player(xPos, yPos, color) {
  this.mapPosition = createVector(xPos, yPos);
  this.screenPosition = createVector(width / 2, height / 2);
  this.size = 20;
  this.direction = 0;
  this.color = color;

  this.render = function() {
    push();
    
	  //ellipse(this.x, this.y, 50, 50);
    //var x = width / 2;
    //var y = (height / 2) - 15;
    translate(this.screenPosition.x, this.screenPosition.y);
    rotate(this.direction);
    noFill();
    stroke(this.color.r, this.color.g, this.color.b);
    strokeWeight(2);
    var txt = 'MAP POSITION \n X: ' + this.mapPosition.x + ' Y: ' + this.mapPosition.y;
    text(txt, 50, 50);
    triangle(0, -this.size, this.size, this.size, -this.size, this.size);
    
    pop();
  };

  this.renderOpponent = function(distanceObj){
    push();
    
	  //ellipse(this.x, this.y, 50, 50);
    //var x = width / 2;
    //var y = (height / 2) - 15;
    if (distanceObj){
translate(this.screenPosition.x + distanceObj.x, this.screenPosition.y + distanceObj.y);
    }else{
translate(this.mapPosition.x, this.mapPosition.y);
    }
    
    rotate(this.direction);
    noFill();
    stroke(this.color.r, this.color.g, this.color.b);
    strokeWeight(2);
    var txt = 'MAP POSITION \n X: ' + this.mapPosition.x + ' Y: ' + this.mapPosition.y;
    text(txt, 50, 50);
    triangle(0, -this.size, this.size, this.size, -this.size, this.size);
    
    pop();
  }

  this.setDirection = function(direction){
    this.direction = direction;
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
      this.mapPosition.x -= 5;
    }

    // RIGHT
    if (keyIsDown(68)){
      this.mapPosition.x += 5;
    }

    // UP
    if (keyIsDown(87)){
      this.mapPosition.y -= 5;
    }

    // DOWN
    if (keyIsDown(83)){
      this.mapPosition.y += 5;
    }

    this.mapPosition.x = constrain(this.mapPosition.x, 0, worldWidth);
    this.mapPosition.y = constrain(this.mapPosition.y, 0, worldHeight);
    
  };

  this.calculateDistance = function(otherPlayer){
    var distanceObj = {
      x: this.mapPosition.x - otherPlayer.mapPosition.x,
      y: this.mapPosition.y - otherPlayer.mapPosition.y,
      distance: dist(this.mapPosition.x, this.mapPosition.y, otherPlayer.mapPosition.x, otherPlayer.mapPosition.y)
    }
    return distanceObj;
  }
  /* FOR TEST PURPOSES */
  this.grow = function(){
    this.size += 10;
  };
}