// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function Player(xPos, yPos, color) {
  this.x = xPos;
  this.y = yPos;
  this.color = color;

  this.render = function() {
    fill(this.color.r, this.color.g, this.color.b);
	  ellipse(this.x, this.y, 50, 50);
  };

 this.move = function() {
     if (keyIsDown(LEFT_ARROW))
    this.x-=5;

  if (keyIsDown(RIGHT_ARROW))
    this.x+=5;

  if (keyIsDown(UP_ARROW))
    this.y-=5;

  if (keyIsDown(DOWN_ARROW))
    this.y+=5;
 };
 
}