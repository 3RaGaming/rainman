// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function Ship() {
  this.pos = createVector(height / 2, width / 2);
  this.r = 20;
  this.heading = 0;

  

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }

 this.move = function() {
     if (keyIsDown(LEFT_ARROW))
    this.x-=5;

  if (keyIsDown(RIGHT_ARROW))
    this.x+=5;

  if (keyIsDown(UP_ARROW))
    this.y-=5;

  if (keyIsDown(DOWN_ARROW))
    this.y+=5;
 }
  
  this.turn = function() {
    this.heading = atan2(mouseY-height/2, mouseX-width/2);
    }
	
	
	
	
}