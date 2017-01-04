// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

function player(x, y) {
  this.x = x;
  this.y = y;
}
  

  this.render = function() {
    fill(255, 0, 0);
	ellipse(this.x, this.y, 50, 50);
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
  

	
	
	
	
}